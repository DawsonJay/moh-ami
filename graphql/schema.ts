export const typeDefs = `#graphql
  type WordMapping {
    french: String!
    english: String!
  }

  type TranslationChunk {
    index: Int!
    english: String!
    french: String!
    word_by_word: [WordMapping!]!
    explanation: String!
    grammar_rule: String
    cultural_context: String
  }

  type Alternative {
    translation: String!
    reason: String!
  }

  type Translation {
    chunks: [TranslationChunk!]!
    alternatives: [Alternative!]
  }

  type Query {
    _empty: String
  }

  type Mutation {
    translateText(englishText: String!): Translation!
  }
`

