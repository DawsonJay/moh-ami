// GraphQL response types
// These types match the GraphQL schema structure

export interface WordMapping {
  french: string
  english: string
}

export interface TranslationChunkResponse {
  index: number
  english: string
  french: string
  word_by_word: WordMapping[]
  explanation: string
  grammar_rule: string | null
  cultural_context: string | null
}

export interface AlternativeResponse {
  translation: string
  reason: string
}

export interface TranslationResponse {
  chunks: TranslationChunkResponse[]
  alternatives: AlternativeResponse[]
}

export interface TranslateTextMutationResponse {
  translateText: TranslationResponse
}

export interface TranslateTextMutationData {
  data?: TranslateTextMutationResponse
}

