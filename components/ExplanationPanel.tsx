'use client'

import { TranslationChunk } from '@/graphql/types'

interface ExplanationPanelProps {
  chunk: TranslationChunk | null
  isOpen: boolean
  onClose: () => void
}

export default function ExplanationPanel({ chunk, isOpen, onClose }: ExplanationPanelProps) {
  if (!chunk) return null

  return (
    <>
      {/* Desktop: Side Panel */}
      <div className="hidden md:block fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 shadow-xl transform transition-transform duration-300 z-50" style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
        <div className="h-full overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Explanation</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">English</h4>
              <p className="text-gray-900">{chunk.english}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">French</h4>
              <p className="text-gray-900 font-medium">{chunk.french}</p>
            </div>

            {chunk.word_by_word && chunk.word_by_word.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Word-by-Word</h4>
                <div className="flex flex-wrap gap-2">
                  {chunk.word_by_word.map((mapping, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 rounded text-sm"
                    >
                      <span className="font-medium text-blue-900">{mapping.french}</span>
                      <span className="text-gray-500">=</span>
                      <span className="text-gray-700">{mapping.english}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Explanation</h4>
              <p className="text-gray-700">{chunk.explanation}</p>
            </div>

            {chunk.grammar_rule && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Grammar Rule</h4>
                <p className="text-gray-700">{chunk.grammar_rule}</p>
              </div>
            )}

            {chunk.cultural_context && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Cultural Context</h4>
                <p className="text-gray-700">{chunk.cultural_context}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: Accordion */}
      <div className="md:hidden">
        {isOpen && (
          <div className="border-t border-gray-200 bg-white p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Explanation</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">English</h4>
                <p className="text-gray-900">{chunk.english}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">French</h4>
                <p className="text-gray-900 font-medium">{chunk.french}</p>
              </div>

              {chunk.word_by_word && chunk.word_by_word.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Word-by-Word</h4>
                  <div className="flex flex-wrap gap-2">
                    {chunk.word_by_word.map((mapping, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 rounded text-sm"
                      >
                        <span className="font-medium text-blue-900">{mapping.french}</span>
                        <span className="text-gray-500">=</span>
                        <span className="text-gray-700">{mapping.english}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Explanation</h4>
                <p className="text-gray-700">{chunk.explanation}</p>
              </div>

              {chunk.grammar_rule && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Grammar Rule</h4>
                  <p className="text-gray-700">{chunk.grammar_rule}</p>
                </div>
              )}

              {chunk.cultural_context && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Cultural Context</h4>
                  <p className="text-gray-700">{chunk.cultural_context}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

