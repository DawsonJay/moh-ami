'use client'

import { TranslationChunk } from '@/graphql/types'
import ChunkText from './ChunkText'

interface EnglishTextProps {
  chunks: TranslationChunk[]
  activeChunkIndex: number | null
  onChunkHover: (chunkIndex: number | null) => void
  onChunkClick: (chunkIndex: number) => void
  hoveredChunkIndex: number | null
}

export default function EnglishText(props: EnglishTextProps) {
  return <ChunkText {...props} textKey="english" backgroundColor="bg-gray-50" />
}

