export interface WordMapping {
  french: string
  english: string
}

export interface TranslationChunk {
  index: number
  english: string
  french: string
  word_by_word: WordMapping[]
  explanation: string
  grammar_rule?: string | null
  cultural_context?: string | null
}

export interface Alternative {
  translation: string
  reason: string
}

export interface TranslationResponse {
  chunks: TranslationChunk[]
  alternatives?: Alternative[]
}

