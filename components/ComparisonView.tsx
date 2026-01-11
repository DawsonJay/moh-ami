'use client'

import { useEffect, useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import EnglishText from './EnglishText'
import AnnotatedText from './AnnotatedText'
import { setActiveChunk } from '@/store/slices/translationSlice'

// Constants
const SCROLL_SYNC_TIMEOUT = 50 // milliseconds
const COMPARISON_VIEW_HEIGHT = 600 // pixels

export default function ComparisonView() {
  const dispatch = useAppDispatch()
  const { chunks, activeChunkIndex } = useAppSelector((state) => state.translation)
  const [hoveredChunkIndex, setHoveredChunkIndex] = useState<number | null>(null)
  const englishRef = useRef<HTMLDivElement>(null)
  const frenchRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)

  // Synchronized scrolling: Keep English and French panels in sync when user scrolls
  // Uses a flag (isScrolling) to prevent infinite scroll loops
  useEffect(() => {
    const englishEl = englishRef.current
    const frenchEl = frenchRef.current

    if (!englishEl || !frenchEl) return

    const handleEnglishScroll = () => {
      // Prevent recursive updates when we programmatically scroll the French panel
      if (isScrolling.current) return
      isScrolling.current = true
      
      // Calculate scroll ratio and apply to French panel
      const ratio = englishEl.scrollTop / (englishEl.scrollHeight - englishEl.clientHeight)
      frenchEl.scrollTop = ratio * (frenchEl.scrollHeight - frenchEl.clientHeight)
      
      // Reset flag after a short delay to allow scroll events to settle
      setTimeout(() => {
        isScrolling.current = false
      }, SCROLL_SYNC_TIMEOUT)
    }

    const handleFrenchScroll = () => {
      // Prevent recursive updates when we programmatically scroll the English panel
      if (isScrolling.current) return
      isScrolling.current = true
      
      // Calculate scroll ratio and apply to English panel
      const ratio = frenchEl.scrollTop / (frenchEl.scrollHeight - frenchEl.clientHeight)
      englishEl.scrollTop = ratio * (englishEl.scrollHeight - englishEl.clientHeight)
      
      // Reset flag after a short delay to allow scroll events to settle
      setTimeout(() => {
        isScrolling.current = false
      }, SCROLL_SYNC_TIMEOUT)
    }

    englishEl.addEventListener('scroll', handleEnglishScroll)
    frenchEl.addEventListener('scroll', handleFrenchScroll)

    return () => {
      englishEl.removeEventListener('scroll', handleEnglishScroll)
      frenchEl.removeEventListener('scroll', handleFrenchScroll)
    }
  }, [chunks])

  if (!chunks || chunks.length === 0) {
    return null
  }

  const handleChunkClick = (chunkIndex: number) => {
    dispatch(setActiveChunk(chunkIndex === activeChunkIndex ? null : chunkIndex))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-200 rounded-lg overflow-hidden" style={{ height: `${COMPARISON_VIEW_HEIGHT}px` }}>
      <div ref={englishRef} className="h-full">
        <EnglishText
          chunks={chunks}
          activeChunkIndex={activeChunkIndex}
          onChunkHover={setHoveredChunkIndex}
          onChunkClick={handleChunkClick}
          hoveredChunkIndex={hoveredChunkIndex}
        />
      </div>
      <div ref={frenchRef} className="h-full">
        <AnnotatedText
          chunks={chunks}
          activeChunkIndex={activeChunkIndex}
          onChunkHover={setHoveredChunkIndex}
          onChunkClick={handleChunkClick}
          hoveredChunkIndex={hoveredChunkIndex}
        />
      </div>
    </div>
  )
}

