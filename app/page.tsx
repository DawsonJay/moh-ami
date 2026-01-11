'use client'

import TranslationInput from '@/components/TranslationInput'
import ComparisonView from '@/components/ComparisonView'
import ExplanationPanel from '@/components/ExplanationPanel'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setActiveChunk } from '@/store/slices/translationSlice'

export default function Home() {
  const dispatch = useAppDispatch()
  const { loading, error, chunks, activeChunkIndex } = useAppSelector(
    (state) => state.translation
  )

  const activeChunk =
    activeChunkIndex !== null ? chunks[activeChunkIndex] : null

  const handleCloseExplanation = () => {
    dispatch(setActiveChunk(null))
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">moh-ami</h1>
          <p className="text-gray-600">
            French Learning Translation Tool - Translate English to French with detailed
            explanations
          </p>
        </header>

        <TranslationInput />

        {loading && (
          <div className="mb-6 flex flex-col items-center justify-center py-8">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600">Translating your text...</p>
          </div>
        )}

        {error && (
          <div className={`mb-6 p-4 rounded-lg ${
            error.includes('run out of credits') || error.includes('billing')
              ? 'bg-red-100 border-2 border-red-400'
              : 'bg-red-50 border border-red-200'
          } text-red-800`}>
            <strong>Error:</strong> {error}
            {(error.includes('run out of credits') || error.includes('billing')) && (
              <div className="mt-2">
                <a 
                  href="https://platform.openai.com/account/billing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Add credits to your OpenAI account →
                </a>
              </div>
            )}
          </div>
        )}

        {!loading && <ComparisonView />}

        <ExplanationPanel
          chunk={activeChunk}
          isOpen={activeChunkIndex !== null}
          onClose={handleCloseExplanation}
        />
      </div>
    </main>
  )
}
