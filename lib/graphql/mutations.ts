import { gql } from '@apollo/client'

export const TRANSLATE_TEXT = gql`
  mutation TranslateText($englishText: String!) {
    translateText(englishText: $englishText) {
      chunks {
        index
        english
        french
        word_by_word {
          french
          english
        }
        explanation
        grammar_rule
        cultural_context
      }
      alternatives {
        translation
        reason
      }
    }
  }
`

