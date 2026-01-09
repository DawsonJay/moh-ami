# Chat Records - AI Assistant Instructions

## Purpose
This document provides complete instructions for creating chat records in this portfolio project. Follow these instructions exactly when the user requests a chat record.

## File Location
**All chat records for this project must be created in the portfolio-profile project at:**
```
/home/james/Documents/portfolio-profile/records/moh-ami/chat-record-[timestamp].md
```

**Important**: Chat records are stored in the portfolio-profile project, not in this moh-ami directory. This keeps data/documentation separate from code.

## Step 1: Get Current Timestamp
**Execute this command to get the current GMT/UTC timestamp:**
```bash
date -u +%Y-%m-%d-%H%M
```

**Format:** `YYYY-MM-DD-HHMM` (e.g., `2024-12-19-1430`)
- YYYY = 4-digit year
- MM = 2-digit month (01-12)
- DD = 2-digit day (01-31)
- HH = 2-digit hour in 24-hour format (00-23)
- MM = 2-digit minute (00-59)
- **Always use GMT/UTC timezone**

## Step 2: Create File
**Create a new markdown file in the portfolio-profile project at:**
```
/home/james/Documents/portfolio-profile/records/moh-ami/chat-record-[timestamp].md
```

Replace `[timestamp]` with the timestamp from Step 1.

## Step 3: Write File Header
**Start the file with:**
```markdown
# Chat Record - [timestamp]
```

Replace `[timestamp]` with the timestamp (format: `YYYY-MM-DD-HHMM`).

## Step 4: Include Complete Chat Context
**Add a "Chat Context" section with ALL of the following subsections:**

### Chat Context Structure
Include every subsection below. Write in past tense. Be specific and rich with details.

#### What was being worked on
- The specific task/project/issue being discussed
- Include context about why this work was happening
- Mention any previous attempts or iterations

#### Project state
- Current project goals and constraints
- Timeline and deadlines
- Current skills and experience level
- Project structure and components

#### Technical environment
- Current tools and platforms being used
- Files currently open or being worked on
- Development environment details
- User preferences and working style

#### Key decisions made
- Specific decisions reached during the conversation
- Why those decisions were made
- What alternatives were considered
- How this changes the approach

#### Current conversation focus
- What specific aspect is being discussed right now
- What question or problem is being addressed
- What the immediate goal is

#### Next steps
- What is planned to happen next
- Immediate next actions
- Dependencies or blockers
- Timeline for next work

#### Key insights/decisions made
- What was learned during this conversation
- New understanding or realizations
- Strategic insights gained
- How this changes future approach

#### Portfolio value
- How this moment demonstrates skills or thinking
- What this shows about problem-solving approach
- How this contributes to the growth story
- What employers would find valuable

#### Related files/context
- Files currently open or referenced
- Other documents or resources mentioned
- Connections to other parts of the project

#### What this means for portfolio
- How this moment fits into the larger portfolio strategy
- What skills or qualities this demonstrates
- How this contributes to the immigration/employment goals
- What story this helps tell

### Writing Guidelines for Chat Context
- **Use past tense**: "The user was working on..." not "The user is working on..."
- **Be specific**: Include details that actually change from record to record
- **Avoid generic boilerplate**: Focus on what was unique about this moment
- **Think like future AI**: What would an AI need to know to continue this conversation?

## Step 5: Add User-Defined Content Section
**After the Chat Context section, add a section for the specific content the user requested.**

The section title should describe the content (e.g., "LLM Integration Implementation", "Translation API Setup", "Explanation Component Design", "GraphQL Schema Definition").

Include all specific content the user requested, such as:
- Code examples
- Design decisions
- Technical challenges
- Learning outcomes
- Implementation details
- Test results
- API integration strategies
- Error handling approaches

## Complete File Structure
```markdown
# Chat Record - [timestamp]

## Chat Context

### What was being worked on
[Specific task/project/issue with context]

### Project state
[Current project goals, constraints, timeline, skills, structure]

### Technical environment
[Tools, files, development environment, user preferences]

### Key decisions made
[Specific decisions, why, alternatives considered, impact]

### Current conversation focus
[What aspect is being discussed, question/problem, immediate goal]

### Next steps
[Planned next actions, dependencies, blockers, timeline]

### Key insights/decisions made
[What was learned, new understanding, strategic insights, future impact]

### Portfolio value
[Skills demonstrated, problem-solving approach, growth story contribution, employer value]

### Related files/context
[Files open/referenced, documents/resources, project connections]

### What this means for portfolio
[Portfolio strategy fit, skills/qualities demonstrated, immigration/employment contribution, story value]

## [User-Defined Content Section]
[Specific content as requested by the user]
```

## Example
When user says: "create a chat record with details on the LLM integration we just completed, showing the prompt structure and translation explanation implementation"

**You must:**
1. Execute `date -u +%Y-%m-%d-%H%M` to get timestamp
2. Create file at `/home/james/Documents/portfolio-profile/records/moh-ami/chat-record-[timestamp].md`
3. Write header: `# Chat Record - [timestamp]`
4. Include complete Chat Context section with all subsections
5. Add section: `## LLM Integration Implementation` with prompt structure, translation explanation implementation, and technical details

## Important Rules
- **Always use GMT/UTC timezone** for timestamps
- **Always create file in** `/home/james/Documents/portfolio-profile/records/moh-ami/` folder (portfolio-profile project, not moh-ami directory)
- **Always include complete Chat Context** with all subsections
- **Always write in past tense** for chat context
- **Always be specific** - avoid generic boilerplate
- **Always include** the user-requested specific content section

