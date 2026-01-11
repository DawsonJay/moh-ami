// Translation constants
// These are safe to import in both client and server components

// Maximum input length for translation
// Set to 5000 characters for practical UX and cost control
// This is well within GPT-4o-mini's 128k token context window
export const MAX_INPUT_LENGTH = 5000

// Character limit threshold for warning (90% of max)
export const NEAR_LIMIT_THRESHOLD = 0.9

