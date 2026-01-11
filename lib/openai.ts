import OpenAI from 'openai'
import { TranslationResponse } from '@/graphql/types'
import { MAX_INPUT_LENGTH } from './constants'

// Lazy initialization - only create client when needed (not during build)
function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in environment variables')
  }
  
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

const TRANSLATION_PROMPT = `You are a French language learning assistant. Translate the following English text to French and provide detailed explanations.

English text:
{ENGLISH_TEXT}

IMPORTANT: Split the text into semantic chunks (sentences or phrases). Each chunk should be a meaningful unit that can be translated and explained independently. Group short related sentences together, but split longer sentences at natural break points (commas, semicolons, clause boundaries). Aim for chunks that are roughly 50-150 characters in length.

Provide your response as a JSON object with this exact structure:
{
  "chunks": [
    {
      "index": 0,
      "english": "English text for this chunk",
      "french": "French translation of this chunk",
      "word_by_word": [
        {"french": "On", "english": "One"},
        {"french": "dirait", "english": "would say"},
        {"french": "que", "english": "that"}
      ],
      "explanation": "Detailed explanation of why this translation was chosen, including grammar, vocabulary choices, and any nuances",
      "grammar_rule": "Grammar rule applied (e.g., 'Use of subjunctive mood', 'Agreement of adjectives')",
      "cultural_context": "Cultural note if relevant (optional, can be null)"
    },
    {
      "index": 1,
      "english": "Next chunk of English text",
      "french": "French translation of next chunk",
      "word_by_word": [...],
      "explanation": "...",
      "grammar_rule": "...",
      "cultural_context": null
    }
  ],
  "alternatives": [
    {
      "translation": "Alternative French translation of entire text",
      "reason": "Why this alternative differs and when it might be used"
    }
  ]
}

REQUIREMENTS:
1. Split the text into semantic chunks (sentences/phrases). Each chunk should have an index starting from 0.
2. For each chunk, provide the exact English text and its French translation.
3. For each chunk, provide a "word_by_word" array mapping each French word to its English equivalent. 
   CRITICAL ACCURACY REQUIREMENTS for word_by_word:
   - Each French word must map to the CORRECT corresponding English word/phrase based on CONTEXT. Be extremely precise.
   - Consider the context of the sentence when translating words with multiple meanings:
     * "baguette" = "wand" (in magic/fantasy context), "stick/rod" (general), "baguette bread" (food context)
     * "son" = "his" (possessive), NEVER "living room" or "salon"
     * "salon" = "living room" or "salon", NEVER "his"
     * "sa" = "her/his" (possessive), NEVER "living room"
     * "main" = "hand", NEVER other meanings
     * "était" = "was", NEVER other meanings
   - Common French words and their correct translations:
     * "le/la/les" = "the", NEVER other meanings
     * "un/une" = "a/an", NEVER other meanings
     * "de" = "of/from", NEVER "the" or "his"
     * "du" = "of the" or "some", NEVER "his" or "living room"
     * "par" = "by", NEVER other meanings
     * "qui" = "who/which", NEVER other meanings
     * "que" = "that/which", NEVER other meanings
     * "dans" = "in/into", NEVER other meanings
     * "toujours" = "still/always", context-dependent
   - Articles (le, la, les, un, une, des) must map to "the", "a/an", "some"
   - Prepositions (de, à, par, pour, avec, sans, dans) must map to their correct English equivalents
   - Possessive adjectives (mon, ma, mes, ton, ta, tes, son, sa, ses) must map correctly
   - Verbs must be translated in their correct tense and form
   - Ensure word order and meaning are accurately reflected
   - If a French word doesn't have a direct English equivalent, use the closest meaningful translation based on context
   This helps learners understand word order and individual word translations accurately.
4. Include a detailed explanation for each chunk explaining why the translation was chosen.
5. Include grammar rules when they are important for understanding.
6. Include cultural context when relevant (can be null if not applicable).
7. Be thorough but concise in explanations.
8. Return ONLY valid JSON, no additional text before or after.

Now translate and explain the text above, splitting it into indexed chunks.`

export async function translateText(
  englishText: string
): Promise<TranslationResponse> {
  if (!englishText || englishText.trim().length === 0) {
    throw new Error('English text cannot be empty')
  }

  // Validate character limit
  if (englishText.length > MAX_INPUT_LENGTH) {
    throw new Error(
      `Text exceeds maximum length of ${MAX_INPUT_LENGTH.toLocaleString()} characters. Please shorten your text and try again.`
    )
  }

  const prompt = TRANSLATION_PROMPT.replace('{ENGLISH_TEXT}', englishText)

  try {
    // Get OpenAI client (lazy initialization - only when actually needed)
    const openai = getOpenAIClient()
    
    // Use GPT-4o-mini for better accuracy and cost-effectiveness
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content:
            'You are a French language learning assistant. Always respond with valid JSON only, no additional text.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    // Parse JSON response
    let parsedResponse: TranslationResponse
    try {
      parsedResponse = JSON.parse(content)
    } catch (parseError) {
      // Try to extract JSON from response if it's wrapped in markdown
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Failed to parse OpenAI response as JSON')
      }
    }

    // Validate response structure
    if (!Array.isArray(parsedResponse.chunks) || parsedResponse.chunks.length === 0) {
      throw new Error('Invalid response structure from OpenAI: chunks array is required')
    }

    // Common French word mappings for validation
    const commonWordMappings: Record<string, string[]> = {
      'son': ['his', 'her', 'its', 'one\'s'],
      'salon': ['living room', 'salon', 'parlor', 'sitting room'],
      'sa': ['his', 'her', 'its'],
      'le': ['the'],
      'la': ['the'],
      'les': ['the'],
      'un': ['a', 'an', 'one'],
      'une': ['a', 'an', 'one'],
      'de': ['of', 'from', 'about', 'some'],
      'du': ['of the', 'some', 'from the'],
      'par': ['by', 'through', 'via'],
      'qui': ['who', 'which', 'that'],
      'que': ['that', 'which', 'what', 'than'],
      'avec': ['with'],
      'sans': ['without'],
      'pour': ['for', 'to'],
      'dans': ['in', 'into', 'within'],
    }

    // Validate chunks have required fields and indices are sequential
    for (let i = 0; i < parsedResponse.chunks.length; i++) {
      const chunk = parsedResponse.chunks[i]
      if (!chunk.english || !chunk.french || !chunk.explanation) {
        throw new Error(`Invalid chunk at index ${i}: missing required fields`)
      }
      if (chunk.index !== i) {
        // Fix index if it's wrong
        chunk.index = i
      }
      // Ensure word_by_word is an array
      if (!Array.isArray(chunk.word_by_word)) {
        chunk.word_by_word = []
      }

      // Validate word-by-word mappings for common errors
      if (Array.isArray(chunk.word_by_word)) {
        for (const mapping of chunk.word_by_word) {
          const frenchWord = mapping.french?.toLowerCase().trim()
          const englishWord = mapping.english?.toLowerCase().trim()
          
          if (frenchWord && commonWordMappings[frenchWord]) {
            const validTranslations = commonWordMappings[frenchWord]
            const isCloseMatch = validTranslations.some(valid => 
              englishWord?.includes(valid) || valid.includes(englishWord || '')
            )
            
            if (!isCloseMatch && englishWord) {
              // Log warning but don't fail - the LLM might have a valid reason
              console.warn(
                `Potential word mapping error in chunk ${i}: "${frenchWord}" mapped to "${mapping.english}" ` +
                `(expected one of: ${validTranslations.join(', ')})`
              )
              // Optionally auto-correct obvious errors
              if (frenchWord === 'son' && (englishWord.includes('living') || englishWord.includes('room') || englishWord.includes('salon'))) {
                console.warn(`Auto-correcting: "son" should be "his", not "${mapping.english}"`)
                mapping.english = 'his'
              }
              if (frenchWord === 'salon' && (englishWord.includes('his') || englishWord.includes('her'))) {
                console.warn(`Auto-correcting: "salon" should be "living room", not "${mapping.english}"`)
                mapping.english = 'living room'
              }
            }
          }
        }
      }
    }

    return parsedResponse
  } catch (error) {
    // Handle OpenAI API errors specifically
    if (error instanceof OpenAI.APIError) {
      // Check for credit/quota errors
      if (error.code === 'insufficient_quota' || error.status === 429) {
        throw new Error(
          'Your OpenAI account has run out of credits. Please add credits to your account at https://platform.openai.com/account/billing'
        )
      }
      // Check for billing errors
      if (error.code === 'billing_not_active') {
        throw new Error(
          'OpenAI billing is not active. Please set up billing at https://platform.openai.com/account/billing'
        )
      }
      // Check for rate limit errors
      if (error.code === 'rate_limit_exceeded' || error.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.')
      }
      // Check for context length errors
      if (error.code === 'context_length_exceeded') {
        throw new Error(
          `Text is too long. Maximum length is ${MAX_INPUT_LENGTH.toLocaleString()} characters.`
        )
      }
      // Generic API error
      throw new Error(`OpenAI API error: ${error.message}`)
    }
    // Handle other errors
    if (error instanceof Error) {
      // If it's already a user-friendly error (from our validation), re-throw it
      if (error.message.includes('exceeds maximum length') || error.message.includes('run out of credits')) {
        throw error
      }
      throw new Error(`Translation failed: ${error.message}`)
    }
    throw new Error('Unknown error occurred during translation')
  }
}

