import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TranslationChunk, Alternative } from '@/graphql/types'

export interface TranslationState {
  englishText: string
  chunks: TranslationChunk[]
  alternatives: Alternative[]
  loading: boolean
  error: string | null
  history: Array<{
    id: string
    englishText: string
    frenchTranslation: string
    timestamp: number
  }>
  activeChunkIndex: number | null
}

const initialState: TranslationState = {
  englishText: '',
  chunks: [],
  alternatives: [],
  loading: false,
  error: null,
  history: [],
  activeChunkIndex: null,
}

const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    setEnglishText: (state, action: PayloadAction<string>) => {
      state.englishText = action.payload
    },
    setTranslation: (
      state,
      action: PayloadAction<{
        chunks: TranslationChunk[]
        alternatives: Alternative[]
      }>
    ) => {
      state.chunks = action.payload.chunks
      state.alternatives = action.payload.alternatives
      // Don't set loading to false here - let the component handle it in finally block
      state.error = null
      
      // Reconstruct full translations for history
      const fullEnglishText = action.payload.chunks.map(c => c.english).join(' ')
      const fullFrenchTranslation = action.payload.chunks.map(c => c.french).join(' ')
      
      // Add to history
      state.history.unshift({
        id: Date.now().toString(),
        englishText: fullEnglishText,
        frenchTranslation: fullFrenchTranslation,
        timestamp: Date.now(),
      })
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
    setActiveChunk: (state, action: PayloadAction<number | null>) => {
      state.activeChunkIndex = action.payload
    },
    clearTranslation: (state) => {
      state.chunks = []
      state.alternatives = []
      state.activeChunkIndex = null
      state.error = null
    },
  },
})

export const {
  setEnglishText,
  setTranslation,
  setLoading,
  setError,
  setActiveChunk,
  clearTranslation,
} = translationSlice.actions

export default translationSlice.reducer

