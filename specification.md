# moh-ami - Technical Specification

## Overview

**moh-ami** (pronounced "moh-ah-mee", from "mot ami" meaning "word friend") is a French learning translation tool that translates English text to French with detailed explanations for each part. The tool helps users understand not just what the translation is, but why each word or phrase was translated in that specific way.

## Project Purpose

This project demonstrates:
- **LLM Integration**: Core feature using OpenAI/Anthropic APIs for translation and explanations
- **Next.js**: Modern React framework for the frontend
- **GraphQL**: API layer for data fetching
- **Redux**: State management for translation history and user preferences
- **TypeScript**: Type-safe development
- **PostgreSQL**: Database for storing translation history and vocabulary

## Core Concept

**User Flow:**
1. User inputs English text in a text box
2. System sends text to LLM with structured prompt
3. LLM returns:
   - French translation
   - Detailed explanations for each part (word-by-word, phrase-by-phrase)
   - Grammar rules applied
   - Cultural context when relevant
   - Alternative translations and why they differ
4. User sees side-by-side comparison with expandable explanation sections

## Features

### Primary Features
- **Translation**: English → French translation
- **Detailed Explanations**: Word-by-word and phrase-by-phrase explanations
- **Grammar Rules**: Explanation of grammar rules applied
- **Cultural Context**: Cultural nuances when relevant
- **Alternative Translations**: Show alternative translations and explain differences

### Secondary Features (Future)
- Save translations for review
- Vocabulary tracking (words learned)
- Progress visualization
- Practice mode (hide explanations, then reveal)
- Translation history

## Technical Stack

### Frontend
- **Next.js**: React framework with SSR/SSG capabilities
- **React**: UI library
- **TypeScript**: Type-safe development
- **Redux**: State management (translation history, saved items, user preferences)
- **Tailwind CSS**: Styling (or Material UI if preferred)

### Backend
- **GraphQL**: API layer (Apollo Server)
- **Node.js**: Runtime environment
- **Express.js**: Web framework (if not using Next.js API routes)
- **PostgreSQL**: Database for translation history and vocabulary

### LLM Integration
- **OpenAI API** or **Anthropic API**: For translation and explanations
- **Structured Prompts**: Carefully designed prompts for consistent output

### Development Tools
- **Git**: Version control
- **GitHub**: Repository hosting

## Architecture

### Component Structure

```
Frontend (Next.js/React)
├── TranslationInput (text input component)
├── TranslationOutput (French translation display)
├── ExplanationPanel (expandable explanations)
├── HistoryPanel (saved translations)
└── ProgressTracker (vocabulary/learning progress)

Backend (GraphQL API)
├── Translation Resolver (LLM integration)
├── History Resolver (save/retrieve translations)
├── Vocabulary Resolver (track learned words)
└── User Preferences Resolver

Database (PostgreSQL)
├── translations (history of translations)
├── vocabulary (words/phrases learned)
└── user_preferences (settings, saved items)
```

### Data Flow

```
User Input (English)
    ↓
Frontend (Next.js)
    ↓
GraphQL API
    ↓
LLM Service (OpenAI/Anthropic)
    ↓
Translation + Explanations
    ↓
GraphQL Response
    ↓
Redux Store (state management)
    ↓
UI Components (display results)
    ↓
PostgreSQL (save to history)
```

## LLM Integration

### Prompt Structure

The LLM prompt should request structured output:

```
Translate the following English text to French and provide detailed explanations:

English: "[user input]"

Provide:
1. French Translation: [translation]
2. Word-by-word explanations:
   - [English word/phrase] → [French translation]: [explanation]
3. Grammar rules applied:
   - [rule]: [explanation]
4. Cultural context (if relevant):
   - [context note]
5. Alternative translations:
   - [alternative]: [why it differs]
```

### Response Format

The LLM should return structured JSON:
```json
{
  "translation": "French translation here",
  "explanations": [
    {
      "english": "English phrase",
      "french": "French translation",
      "explanation": "Why this translation",
      "grammar_rule": "Grammar rule applied",
      "cultural_context": "Cultural note if relevant"
    }
  ],
  "alternatives": [
    {
      "translation": "Alternative translation",
      "reason": "Why this differs"
    }
  ]
}
```

## Development Approach

### Phase 1: Core Translation (Week 1)
- Set up Next.js project
- Create basic UI (input box, output display)
- Integrate LLM API (OpenAI or Anthropic)
- Implement basic translation
- Test prompt structure and response parsing

### Phase 2: Explanations (Week 2)
- Design explanation UI components
- Parse structured LLM responses
- Display word-by-word explanations
- Add expandable sections for detailed info
- Implement grammar rules display

### Phase 3: State Management & Database (Week 3)
- Set up Redux store
- Implement GraphQL API
- Set up PostgreSQL database
- Add translation history
- Implement save/retrieve functionality

### Phase 4: Polish & Deployment (Week 4)
- Add vocabulary tracking
- Create progress visualization
- Performance optimization
- Deploy to Railway/Render
- Create README and documentation

## Database Schema

### translations
```sql
CREATE TABLE translations (
  id SERIAL PRIMARY KEY,
  english_text TEXT NOT NULL,
  french_translation TEXT NOT NULL,
  explanations JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  user_id INTEGER -- if multi-user in future
);
```

### vocabulary
```sql
CREATE TABLE vocabulary (
  id SERIAL PRIMARY KEY,
  french_word TEXT NOT NULL,
  english_meaning TEXT,
  times_seen INTEGER DEFAULT 1,
  last_seen TIMESTAMP DEFAULT NOW(),
  user_id INTEGER
);
```

## API Endpoints (GraphQL)

### Queries
- `getTranslationHistory`: Retrieve saved translations
- `getVocabulary`: Get learned words
- `getUserPreferences`: Get user settings

### Mutations
- `translateText`: Send English text, get French translation + explanations
- `saveTranslation`: Save translation to history
- `addVocabulary`: Track learned word
- `updatePreferences`: Update user settings

## Portfolio Value

This project demonstrates:
- **LLM Integration**: Core feature showing ability to work with AI APIs
- **Next.js**: Modern React framework experience
- **GraphQL**: API design and implementation
- **Redux**: State management patterns
- **Full-Stack Development**: End-to-end application
- **TypeScript**: Type-safe development
- **Database Design**: PostgreSQL schema and queries
- **Problem-Solving**: Creating a useful learning tool

## Success Criteria

- User can input English text and get French translation
- Explanations are clear and educational
- UI is intuitive and responsive
- Translations are saved and can be reviewed
- Project is deployed and accessible
- Code is well-documented and maintainable

## Timeline

**Total Duration**: 1 month (4 weeks)

- **Week 1**: Core translation functionality
- **Week 2**: Explanations and UI polish
- **Week 3**: State management and database
- **Week 4**: Deployment and documentation

## Next Steps

1. Set up Next.js project structure
2. Choose LLM provider (OpenAI or Anthropic)
3. Design initial UI mockup
4. Implement basic translation flow
5. Iterate based on testing

