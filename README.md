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

### React Support

To use the `react` config, you also need React plugins:

```bash
bun add -d eslint-plugin-react eslint-plugin-react-hooks
```

**Note:** ESLint must be version 10.x for this preset to work.



## Usage

### Basic Setup

Add `eslint-antislop` to your `eslint.config.js` (flat config format):

```js
import antislop from "eslint-antislop";

export default [
  antislop, // Uses recommended config by default
];
```

### Config Presets

This package exports several preset configurations to choose from:

```js
import { base, recommended, strict, typescript, react } from "eslint-antislop";

export default [
  base,         // Base rules only (most lenient)
  recommended,  // Recommended defaults (default export)
  strict,       // Strict mode (most rules enabled)
  typescript,   // TypeScript-specific rules
  react,        // React-specific rules
];
```

### Example: React + TypeScript

```js
import antislop from "eslint-antislop";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    plugins: { react, "react-hooks": reactHooks },
  },
  antislop.configs.typescript,
  antislop.configs.react,
];
```

The `react` config enables:
- `react/no-danger` - Detects `dangerouslySetInnerHTML` (XSS vulnerability)
- `react-hooks/exhaustive-deps` - Detects missing/empty dependencies in `useEffect`/`useCallback` (replaces removed antislop hook rules)

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
- `antislop/no-sql-concat` - Detects SQL injection risks

### Code Quality
- `antislop/no-todo` - Flags TODO comments
- `antislop/no-fallback-defaults` - Flags silent error handling
- `antislop/no-dead-code-patterns` - Flags commented-out code blocks
- `antislop/no-generic-error-messages` - Flags non-descriptive error messages

### Framework-Specific
- `antislop/no-express-unhandled` - Flags async Express handlers without try/catch
- `antislop/no-error-info-leak` - Flags error details exposed to clients
- `antislop/no-inner-html` - Flags dangerous innerHTML usage (HTML elements)

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

### React Hooks (via eslint-plugin-react-hooks)
The `react` config enables `react-hooks/exhaustive-deps`, which replaces the following removed antislop rules:
- `no-use-effect-derived-state` → `react-hooks/exhaustive-deps`
- `no-use-effect-empty-deps` → `react-hooks/exhaustive-deps`
- `no-use-callback-empty-deps` → `react-hooks/exhaustive-deps`
- `no-set-state-in-loop` → `react-hooks/exhaustive-deps`

## Configuration

### Customizing Rules

```js
import { recommended } from "eslint-antislop";

export default [
  {
    ...recommended,
    rules: {
      // Make a warning an error
      "antislop/no-stub-functions": "error",
      
      // Silence a rule
      "antislop/no-obvious-comments": "off",
      
      // Custom severity
      "antislop/no-todo": "warn",
    },
  },
];
```

### Extending the Base Config

```js
import { base } from "eslint-antislop";

export default [
  {
    ...base,
    rules: {
      // Add additional native ESLint rules
      "max-depth": ["warn", 3],  // Stricter than base (4)
      "max-lines-per-function": ["error", { max: 50 }],  // Stricter than base (80)
    },
  },
];
```

## Development

```bash
# Install dependencies
npm install

# Lint the codebase
npm run lint

# Run tests
npm run test

# Type checking
npm run typecheck
```

## Contributing

Contributions are welcome! Feel free to:
- Add new rules to detect AI-generated code patterns
- Improve existing rule implementations
- Add tests for new rules
- Update documentation

## License

MIT
