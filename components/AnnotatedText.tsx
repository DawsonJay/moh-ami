'use client'

import { TranslationChunk } from '@/graphql/types'
import ChunkText from './ChunkText'

interface AnnotatedTextProps {
  chunks: TranslationChunk[]
  activeChunkIndex: number | null
  onChunkHover: (chunkIndex: number | null) => void
  onChunkClick: (chunkIndex: number) => void
  hoveredChunkIndex: number | null
}

export default function AnnotatedText(props: AnnotatedTextProps) {
  return <ChunkText {...props} textKey="french" backgroundColor="bg-white" />
}

