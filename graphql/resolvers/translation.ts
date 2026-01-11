import { translateText } from '@/lib/openai'
import { MAX_INPUT_LENGTH } from '@/lib/constants'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export const resolvers = {
  Query: {
    _empty: () => null,
  },
  Mutation: {
    translateText: async (_: unknown, { englishText }: { englishText: string }) => {
      if (!englishText || englishText.trim().length === 0) {
        throw new Error('English text cannot be empty')
      }

      // Validate character limit
      if (englishText.length > MAX_INPUT_LENGTH) {
        throw new Error(
          `Text exceeds maximum length of ${MAX_INPUT_LENGTH.toLocaleString()} characters. Please shorten your text and try again.`
        )
      }

      try {
        const result = await translateText(englishText)
        
        const translationData = {
          chunks: result.chunks.map((chunk) => ({
            index: chunk.index,
            english: chunk.english,
            french: chunk.french,
            word_by_word: chunk.word_by_word || [],
            explanation: chunk.explanation,
            grammar_rule: chunk.grammar_rule || null,
            cultural_context: chunk.cultural_context || null,
          })),
          alternatives: result.alternatives || [],
        }

        // Reconstruct full translations for database storage
        const fullEnglishText = result.chunks.map(c => c.english).join(' ')
        const fullFrenchTranslation = result.chunks.map(c => c.french).join(' ')

        // Save to database
        try {
          await prisma.translation.create({
            data: {
              englishText: fullEnglishText,
              frenchTranslation: fullFrenchTranslation,
              explanations: translationData.chunks as unknown as Prisma.InputJsonValue,
            },
          })
        } catch (dbError) {
          // Log but don't fail the request if DB save fails
          console.error('Failed to save translation to database:', dbError)
        }

        return translationData
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Translation failed: ${error.message}`)
        }
        throw new Error('Unknown error occurred during translation')
      }
    },
  },
}

