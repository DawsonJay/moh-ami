'use client'

import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setEnglishText, setLoading, setError, clearTranslation } from '@/store/slices/translationSlice'
import { useMutation } from '@apollo/client/react'
import { TRANSLATE_TEXT } from '@/lib/graphql/mutations'
import { apolloClient } from '@/lib/apollo-client'
import { setTranslation } from '@/store/slices/translationSlice'
import { MAX_INPUT_LENGTH, NEAR_LIMIT_THRESHOLD } from '@/lib/constants'
import type { TranslateTextMutationData } from '@/lib/graphql/types'

export default function TranslationInput() {
  const [localText, setLocalText] = useState('')
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.translation)
  const [translateMutation] = useMutation(TRANSLATE_TEXT, { client: apolloClient })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!localText.trim()) {
      return
    }

    // Validate character limit
    if (localText.length > MAX_INPUT_LENGTH) {
      dispatch(setError(
        `Text exceeds maximum length of ${MAX_INPUT_LENGTH.toLocaleString()} characters. Please shorten your text and try again.`
      ))
      return
    }

    dispatch(setEnglishText(localText))
    dispatch(clearTranslation())
    dispatch(setError(null))
    dispatch(setLoading(true))

    try {
      const result = await translateMutation({
        variables: { englishText: localText },
      })

      const data = (result as TranslateTextMutationData).data
      if (data?.translateText) {
        dispatch(setTranslation({
          chunks: data.translateText.chunks,
          alternatives: data.translateText.alternatives || [],
        }))
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Translation failed'
      dispatch(setError(errorMessage))
    } finally {
      // Always set loading to false when done
      dispatch(setLoading(false))
    }
  }

  const characterCount = localText.length
  const isOverLimit = characterCount > MAX_INPUT_LENGTH
  const isNearLimit = characterCount > MAX_INPUT_LENGTH * NEAR_LIMIT_THRESHOLD
  const characterCountColor = isOverLimit 
    ? 'text-red-600 font-semibold' 
    : isNearLimit 
    ? 'text-orange-600' 
    : 'text-gray-500'

  return (
    <form onSubmit={handleSubmit} className="w-full mb-6">
      <div className="relative">
        <textarea
          value={localText}
          onChange={(e) => {
            // Enforce maxLength on client side
            const newValue = e.target.value.slice(0, MAX_INPUT_LENGTH)
            setLocalText(newValue)
          }}
          placeholder="Enter English text to translate..."
          className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
            isOverLimit ? 'border-red-300' : 'border-gray-300'
          }`}
          rows={6}
          disabled={loading}
          maxLength={MAX_INPUT_LENGTH}
        />
        <div className={`absolute bottom-2 right-2 text-sm ${characterCountColor}`}>
          {characterCount.toLocaleString()} / {MAX_INPUT_LENGTH.toLocaleString()} characters
        </div>
      </div>
      {isOverLimit && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
          Text exceeds maximum length. Please shorten your text to {MAX_INPUT_LENGTH.toLocaleString()} characters or less.
        </div>
      )}
      {isNearLimit && !isOverLimit && (
        <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-orange-800 text-sm">
          Approaching character limit ({Math.round((characterCount / MAX_INPUT_LENGTH) * 100)}% used)
        </div>
      )}
      <button
        type="submit"
        disabled={loading || !localText.trim() || isOverLimit}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        title={isOverLimit ? `Text must be ${MAX_INPUT_LENGTH.toLocaleString()} characters or less` : undefined}
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>
    </form>
  )
}

