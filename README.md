# moh-ami

**Pronunciation**: "moh-ah-mee" (from "mot ami" meaning "word friend")

## Purpose

moh-ami is a French learning translation tool that translates English text to French with detailed explanations for each part. Unlike simple translation tools, moh-ami helps you understand not just what the translation is, but why each word or phrase was translated in that specific way.

## Core Functionality

- **Input**: English text in a text box
- **Output**: 
  - French translation
  - Detailed explanations for each part (word-by-word, phrase-by-phrase)
  - Grammar rules applied
  - Cultural context when relevant
  - Alternative translations and why they differ

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Redux Toolkit
- **Backend**: GraphQL API (Apollo Server), Node.js
- **Database**: PostgreSQL (Docker)
- **LLM**: OpenAI GPT-4o-mini for translation and explanations
- **Styling**: Tailwind CSS

## Project Status

✅ **MVP Complete** - Core functionality implemented

## Setup

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- OpenAI API key

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/moh_ami?schema=public
   NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/api/graphql
   ```

4. **Start PostgreSQL database**:
   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**:
   ```bash
   npx prisma migrate dev
   ```

6. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

7. **Start the development server**:
   ```bash
   npm run dev
   ```

8. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment

### Railway Deployment

This project is configured for deployment on Railway via GitHub.

#### Prerequisites

- GitHub repository with code pushed
- Railway account (sign up at [railway.app](https://railway.app))
- OpenAI API key

#### Deployment Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Railway deployment"
   git push origin main
   ```

2. **Create Railway Project**
   - Go to [railway.app](https://railway.app) and sign in
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `moh-ami` repository
   - Railway will auto-detect Next.js

3. **Add PostgreSQL Service**
   - In your Railway project, click "+ New"
   - Select "Database" → "Add PostgreSQL"
   - Railway will automatically create a PostgreSQL database
   - The `DATABASE_URL` environment variable will be set automatically

4. **Set Environment Variables**
   - In your Railway project, go to "Variables" tab
   - Add the following environment variables:
     - `OPENAI_API_KEY` - Your OpenAI API key (required)
     - `OPENAI_MODEL` - Optional, defaults to `gpt-4o-mini`
     - `NEXT_PUBLIC_GRAPHQL_URL` - Optional, defaults to `/api/graphql` (relative URL works)

5. **Run Database Migrations**
   - Railway will automatically run `prisma generate` during build (via `postinstall` script)
   - To run migrations, you can either:
     - Use Railway's CLI: `railway run npm run db:migrate:deploy`
     - Or add a deploy hook in Railway dashboard to run migrations automatically
   - Alternatively, connect to your Railway database and run migrations manually

6. **Deploy**
   - Railway will automatically deploy when you push to the connected branch
   - Or click "Deploy" in the Railway dashboard
   - The build process will:
     1. Run `npm install` (which triggers `postinstall` → `prisma generate`)
     2. Run `npm run build` (which also runs `prisma generate` before build)
     3. Run `npm start` to start the application

7. **Verify Deployment**
   - Check the Railway logs for any errors
   - Visit your Railway-provided URL
   - Test the translation functionality

#### Railway-Specific Configuration

- **Build Command**: `npm run build` (includes Prisma client generation)
- **Start Command**: `npm start`
- **Postinstall**: Automatically runs `prisma generate` after `npm install`
- **Database**: Railway PostgreSQL service provides `DATABASE_URL` automatically

#### Environment Variables Reference

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `OPENAI_API_KEY` | Yes | OpenAI API key for translations | - |
| `DATABASE_URL` | Yes | PostgreSQL connection string | Auto-set by Railway |
| `OPENAI_MODEL` | No | OpenAI model to use | `gpt-4o-mini` |
| `NEXT_PUBLIC_GRAPHQL_URL` | No | GraphQL endpoint URL | `/api/graphql` |

#### Troubleshooting

**Build Fails:**
- Check that Prisma migrations are committed to git
- Verify `DATABASE_URL` is set (should be automatic with PostgreSQL service)
- Check Railway logs for specific error messages

**Database Connection Issues:**
- Ensure PostgreSQL service is added and running
- Verify `DATABASE_URL` is set correctly
- Run migrations: `railway run npm run db:migrate:deploy`

**OpenAI API Errors:**
- Verify `OPENAI_API_KEY` is set correctly
- Check OpenAI account has credits/billing set up
- Review error messages in Railway logs

## Usage

1. Enter English text in the input box
2. Click "Translate" to get the French translation with detailed explanations
3. Click on numbered annotation badges (①, ②, ③) in the French text to see detailed explanations
4. View explanations in the side panel (desktop) or accordion (mobile)

## Documentation

For detailed architecture, component specifications, and development approach, see [specification.md](specification.md).

## License

*To be determined*

