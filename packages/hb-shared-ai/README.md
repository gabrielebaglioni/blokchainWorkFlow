# @houseblock/shared-ai

Shared AI prompts and templates for the HouseBlock monorepo.

## Purpose

This package centralizes all AI prompts, templates, and prompt engineering utilities used across HouseBlock services. It ensures consistency in AI interactions and makes it easy to update prompts across the entire system.

## Usage

```typescript
import { getPrompt, ContentGenerationPrompts } from '@houseblock/shared-ai';

// Get a prompt template
const prompt = getPrompt('content-generation', 'article', {
  topic: 'Ethereum scaling',
  style: 'technical',
  length: 1000
});

// Use in LLM call
const content = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: prompt }]
});
```

## Features

- Centralized prompt templates
- Variable substitution
- Prompt versioning
- Style definitions
- Prompt testing utilities

## Installation

This package is part of the monorepo and is automatically available to all workspaces. No separate installation needed.

## Development

```bash
# Build
pnpm --filter @houseblock/shared-ai build

# Test prompts
pnpm --filter @houseblock/shared-ai test
```

## Structure

```
hb-shared-ai/
├── src/
│   ├── index.ts           # Main exports
│   ├── prompts/
│   │   ├── content-generation.ts
│   │   ├── sentiment-analysis.ts
│   │   ├── opportunity-detection.ts
│   │   └── visual-generation.ts
│   ├── templates/
│   │   └── content-templates.ts
│   └── utils/
│       └── prompt-builder.ts
└── __tests__/
```

## Prompt Categories

### Content Generation

Prompts for generating articles, posts, threads:
- `article-prompt`
- `social-post-prompt`
- `thread-prompt`
- `summary-prompt`

### Analysis

Prompts for analyzing content:
- `sentiment-analysis-prompt`
- `trend-analysis-prompt`
- `opportunity-detection-prompt`

### Visual Generation

Prompts for image generation:
- `article-image-prompt`
- `social-image-prompt`
- `infographic-prompt`

## Prompt Variables

Prompts support variable substitution:
- `{topic}` - Main topic
- `{style}` - Content style
- `{length}` - Desired length
- `{context}` - Additional context
- `{tone}` - Tone of voice

## Best Practices

1. Keep prompts versioned for easy rollback
2. Test prompts with various inputs
3. Document prompt purpose and expected outputs
4. Use consistent variable naming
5. Include examples in prompt documentation

