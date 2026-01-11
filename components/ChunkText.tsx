'use client'

import { TranslationChunk } from '@/graphql/types'

interface ChunkTextProps {
  chunks: TranslationChunk[]
  activeChunkIndex: number | null
  onChunkHover: (chunkIndex: number | null) => void
  onChunkClick: (chunkIndex: number) => void
  hoveredChunkIndex: number | null
  textKey: 'english' | 'french'
  backgroundColor?: string
}

export default function ChunkText({
  chunks,
  activeChunkIndex,
  onChunkHover,
  onChunkClick,
  hoveredChunkIndex,
  textKey,
  backgroundColor = 'bg-white',
}: ChunkTextProps) {
  return (
    <div className={`h-full overflow-y-auto p-4 ${backgroundColor} ${textKey === 'english' ? 'border-r border-gray-200' : ''}`}>
      <div className="space-y-2">
        {chunks.map((chunk) => {
          const isHighlighted = hoveredChunkIndex === chunk.index || activeChunkIndex === chunk.index
          
          return (
            <div
              key={chunk.index}
              className={`
                flex items-start gap-2 p-2 rounded transition-colors
                ${isHighlighted ? 'bg-blue-200' : 'bg-gray-100 hover:bg-blue-100 cursor-pointer'}
              `}
              onMouseEnter={() => onChunkHover(chunk.index)}
              onMouseLeave={() => onChunkHover(null)}
              onClick={() => onChunkClick(chunk.index)}
            >
              <span className="text-gray-400 text-sm font-mono w-8 flex-shrink-0">{chunk.index + 1}</span>
              <div className="flex-1 text-gray-900 leading-relaxed">
                {chunk[textKey]}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

