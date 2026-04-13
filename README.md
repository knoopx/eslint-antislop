# ESLint AntiSlop

ESLint 10.x preset for preventing AI-generated code slop.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Purpose

AI code assistants (Copilot, ChatGPT, etc.) tend to produce code with characteristic patterns that reduce maintainability and code quality. This ESLint preset detects and flags those patterns, helping you maintain clean, production-ready code.

## Installation

### Basic

```bash
bun add -d eslint-antislop eslint
```

**Note:** ESLint must be version 10.x for this preset to work.

## Usage

### Basic Setup

Add `eslint-antislop` to your `eslint.config.js` (flat config format):

```js
import { config } from "eslint-antislop";

export default [...config]; // Spreading enables the config array
```

This single config includes:

- All base ESLint rules (no-eval, no-console, max-depth, etc.)
- All custom antislop rules (no-obvious-comments, no-stub-functions, no-hardcoded-secrets, etc.)
- TypeScript rules (@typescript-eslint/\*)
- React rules (react/_, react-hooks/_)

## What is "AI Slop"?

AI assistants tend to produce code with telltale patterns:

### 🧠 Redundant Comments

- `const x = 5; // initialize x` (obvious comments)
- `// Step 1: Initialize, Step 2: Process, Step 3: Complete` (step comments)
- `// This function handles user authentication` (narrator comments)

### 🔧 Placeholder Code

- `throw new Error("not implemented");`
- `// TODO: implement this later`
- `return null;` (as scaffolding)

### 🛡️ Security Issues

- Hardcoded API keys: `const apiKey = "sk-12345..."`
- SQL string concatenation: `WHERE id = ${id}`
- Exposing error details: `res.json({ error: err.stack })`

### 🧪 Code Quality Issues

- Overly nested code (more than 4 levels deep)
- Functions that are too long (over 80 lines)
- Empty catch blocks (`catch (e) { }`)
- Hallucinated imports (packages that don't exist)
- Missing dependencies in React hooks (via `eslint-plugin-react-hooks`)

## Custom Rules

### AI Slop Detection

- `antislop/no-obvious-comments` - Flags comments that restate the obvious
- `antislop/no-hedging-comments` - Flags uncertain comments ("should work", "might not")
- `antislop/no-step-comments` - Flags numbered step comments
- `antislop/no-section-dividers` - Flags ASCII dividers like `// ===`
- `antislop/no-stub-functions` - Flags placeholder functions that ship to production
- `antislop/no-narrator-comments` - Flags "This function handles..." style comments

### Security

- `antislop/no-hardcoded-secrets` - Detects hardcoded API keys and passwords
- `antislop/no-inner-html` - Flags potential XSS vulnerabilities

### Code Quality

- `antislop/no-todo` - Flags TODO comments
- `antislop/no-fallback-defaults` - Flags silent error handling
- `antislop/no-dead-code-patterns` - Flags commented-out code blocks
- `antislop/no-generic-error-messages` - Flags non-descriptive error messages

### Security

- `antislop/no-error-info-leak` - Flags error details exposed to clients

**Note:** The `react/no-danger` rule (from eslint-plugin-react) also detects `dangerouslySetInnerHTML` in React JSX.

### Code Simplicity

- `antislop/no-boilerplate-wrappers` - Flags unnecessary wrapper functions
- `antislop/no-reexport-shims` - Flags files that only re-export
- `antislop/no-iife-wrapper` - Flags unnecessary IIFE patterns

### Original Rules from KarpeSTOP

- `antislop/no-redundant-comments` - Flags comments explaining self-assignment
- `antislop/no-assumption-comments` - Flags unverified assumptions
- `antislop/no-overconfident-comments` - Flags overconfident language ("obviously", "clearly")
- `antislop/no-magic-css` - Flags hardcoded CSS values
- `antislop/no-fallback-patterns` - Flags incomplete fallback implementations
- `antislop/no-noop-patterns` - Flags no-op code

## Development

```bash
# Install dependencies
bun install

# Build the package
bun run build

# Lint the codebase
bun run lint

# Run tests
bun run test

# Type checking
bun run typecheck
```

## Contributing

Contributions are welcome! Feel free to:

- Add new rules to detect AI-generated code patterns
- Improve existing rule implementations
- Add tests for new rules
- Update documentation
