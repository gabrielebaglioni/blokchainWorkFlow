# Contributing to HouseBlock

Thank you for your interest in contributing to HouseBlock! This document outlines the guidelines and conventions we follow to maintain code quality and consistency across the monorepo.

## Table of Contents

- [Commit Convention](#commit-convention)
- [Branch Strategy](#branch-strategy)
- [Naming Conventions](#naming-conventions)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Requirements](#documentation-requirements)
- [Extending Microservices](#extending-microservices)
- [Code Review Process](#code-review-process)

## Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification to ensure clear and consistent commit messages.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without feature changes or bug fixes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to build process, dependencies, or tooling
- `ci`: Changes to CI/CD configuration
- `build`: Changes to build system or dependencies

### Scope

The scope should indicate which part of the monorepo is affected:

- `web-landing`: Changes to the web landing app
- `dashboard`: Changes to the dashboard app
- `news-scraper-ms`: Changes to news scraper microservice
- `sentiment-tracker-ms`: Changes to sentiment tracker microservice
- `onchain-monitor-ms`: Changes to onchain monitor microservice
- `trend-analyzer-ms`: Changes to trend analyzer microservice
- `opportunity-detector-ms`: Changes to opportunity detector microservice
- `competitor-watchdog-ms`: Changes to competitor watchdog microservice
- `ai-content-engine-ms`: Changes to AI content engine microservice
- `visual-generator-ms`: Changes to visual generator microservice
- `video-generator-ms`: Changes to video generator microservice
- `social-publisher-ms`: Changes to social publisher microservice
- `knowledge-base-ms`: Changes to knowledge base microservice
- `telemetry-logger-ms`: Changes to telemetry logger microservice
- `shared-config`: Changes to shared configuration package
- `shared-types`: Changes to shared types package
- `shared-ai`: Changes to shared AI prompts package
- `infra`: Changes to infrastructure configuration
- `root`: Changes to root-level configuration

### Examples

```
feat(news-scraper-ms): add RSS feed parser for Ethereum blog

Implement RSS feed parsing with support for multiple feed formats.
Add caching mechanism to prevent duplicate article processing.

Closes #123
```

```
fix(web-landing): resolve Three.js memory leak in animation orchestrator

The animation orchestrator was not properly disposing of WebGL contexts
when navigating between pages, causing memory leaks.

Fixes #456
```

```
docs(shared-types): add JSDoc comments to event type definitions

Improve type documentation for better IDE autocomplete and developer
experience when working with event-driven architecture.
```

## Branch Strategy

We use a simplified Git Flow approach:

### Main Branches

- `master`: Production-ready code. Always deployable.
- `develop`: Integration branch for features. Latest development changes.

### Supporting Branches

- `feature/<scope>/<description>`: New features
  - Example: `feature/news-scraper-ms/add-reddit-scraper`
- `fix/<scope>/<description>`: Bug fixes
  - Example: `fix/web-landing/memory-leak-animation`
- `refactor/<scope>/<description>`: Code refactoring
  - Example: `refactor/ai-content-engine-ms/optimize-prompt-caching`
- `docs/<description>`: Documentation updates
  - Example: `docs/update-api-documentation`
- `chore/<description>`: Maintenance tasks
  - Example: `chore/update-dependencies`

### Branch Naming Rules

1. Use lowercase letters and hyphens
2. Be descriptive but concise
3. Include scope when applicable
4. Start with type prefix (feature, fix, refactor, etc.)

### Workflow

1. Create a branch from `develop`
2. Make your changes following conventions
3. Commit with conventional commit messages
4. Push your branch and create a Pull Request
5. After review and approval, merge into `develop`
6. `develop` is periodically merged into `master` for releases

## Naming Conventions

### Microservices

- Directory name: `kebab-case` with `-ms` suffix
  - Example: `news-scraper-ms`, `ai-content-engine-ms`
- Service name in code: `PascalCase` without suffix
  - Example: `NewsScraper`, `AIContentEngine`
- API endpoints: `kebab-case`
  - Example: `/api/v1/news-articles`, `/api/v1/generate-content`

### Packages

- Directory name: `kebab-case` with `hb-` prefix
  - Example: `hb-shared-config`, `hb-shared-types`
- Package name in `package.json`: Same as directory name
- Import path: `@houseblock/shared-config`, `@houseblock/shared-types`

### Files and Directories

- Files: `PascalCase` for components, `camelCase` for utilities, `kebab-case` for configs
  - Components: `NewsArticle.tsx`, `ContentGenerator.ts`
  - Utilities: `formatDate.ts`, `parseRSS.ts`
  - Configs: `docker-compose.yml`, `tsconfig.json`
- Directories: `kebab-case`
  - Example: `api-routes/`, `event-handlers/`, `database-migrations/`

### Variables and Functions

- TypeScript/JavaScript: `camelCase`
  - Example: `fetchNewsArticles`, `processSentiment`
- Constants: `UPPER_SNAKE_CASE`
  - Example: `MAX_RETRY_ATTEMPTS`, `DEFAULT_TIMEOUT_MS`
- Types/Interfaces: `PascalCase`
  - Example: `NewsArticle`, `SentimentAnalysisResult`

## Testing Guidelines

### Test Requirements

Every microservice must include:

1. **Unit Tests**: Test individual functions and modules
   - Location: `__tests__/` or `*.test.ts` files
   - Coverage target: Minimum 80% for core logic

2. **Integration Tests**: Test API endpoints and database interactions
   - Location: `__tests__/integration/`
   - Test all HTTP endpoints with various scenarios

3. **Health Check Tests**: Verify service startup and dependencies
   - Location: `__tests__/health/`
   - Test database connectivity, Redis, external APIs

### Test Naming

- Test files: `*.test.ts` or `*.spec.ts`
- Test suites: Describe the component being tested
- Test cases: Use descriptive names explaining what is being tested

```typescript
describe('NewsScraper', () => {
  describe('parseRSSFeed', () => {
    it('should parse valid RSS feed and extract articles', () => {
      // test implementation
    });

    it('should handle malformed RSS feed gracefully', () => {
      // test implementation
    });
  });
});
```

### Running Tests

```bash
# Run all tests in monorepo
pnpm test

# Run tests for specific service
pnpm --filter news-scraper-ms test

# Run tests with coverage
pnpm --filter news-scraper-ms test:coverage
```

## Documentation Requirements

### README.md

Every microservice and package must have a comprehensive README.md including:

1. **Purpose**: What the service/package does
2. **API Documentation**: Endpoints, request/response formats
3. **Architecture**: Internal structure and design decisions
4. **Dependencies**: External services and libraries
5. **Environment Variables**: Required configuration
6. **Local Development**: How to run locally
7. **Deployment**: How to deploy
8. **Event Flow**: How it fits into the event-driven architecture

### Code Documentation

- Use JSDoc for all public functions and classes
- Document complex algorithms and business logic
- Include examples in documentation when helpful
- Keep comments up-to-date with code changes

### API Documentation

- Use OpenAPI/Swagger for REST APIs
- Document all endpoints, parameters, and responses
- Include example requests and responses
- Document error codes and handling

## Extending Microservices

### Creating a New Microservice

1. **Create Directory Structure**
   ```bash
   mkdir -p services/my-new-ms/{src,__tests__,docs}
   ```

2. **Initialize Package**
   ```bash
   cd services/my-new-ms
   pnpm init
   ```

3. **Create Essential Files**
   - `package.json` with proper dependencies
   - `README.md` with service documentation
   - `TODO.md` with development roadmap
   - `Dockerfile` for containerization
   - `.env.example` with required variables
   - `src/index.ts` as entry point
   - `src/healthcheck.ts` for health monitoring

4. **Follow Independence Rules**
   - No direct code sharing with other services
   - Communication only via HTTP/REST APIs
   - Use shared packages only for types and config
   - Log all operations to telemetry-logger-ms

5. **Register in n8n**
   - Create workflow definitions in `infra/n8n/`
   - Document event triggers and handlers

### Adding Features to Existing Microservices

1. Create a feature branch following naming conventions
2. Update README.md if API or architecture changes
3. Add tests for new functionality
4. Update TODO.md to track progress
5. Ensure backward compatibility when possible
6. Document breaking changes clearly

## Code Review Process

### Before Submitting

- [ ] All tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] No sensitive data in commits
- [ ] Environment variables documented in `.env.example`

### Review Checklist

Reviewers should check:

- [ ] Code quality and maintainability
- [ ] Test coverage is adequate
- [ ] Documentation is clear and complete
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Follows monorepo conventions
- [ ] Proper error handling
- [ ] Logging is appropriate

### Approval

- At least one approval required for merging
- Address all review comments before merging
- Squash commits when merging (unless preserving history is important)

## Questions?

If you have questions about contributing, please:

1. Check existing documentation
2. Review similar code in the codebase
3. Open an issue for discussion
4. Reach out to maintainers

Thank you for contributing to HouseBlock! 🏠

