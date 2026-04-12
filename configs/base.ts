/**
 * Base ESLint configuration for AI slop detection
 */

import type { Linter } from "eslint";
import { plugin } from "../lib/plugin.js";

export const config: Linter.Config = {
  plugins: {
    antislop: plugin,
  },

  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },

  rules: {
    // ==========================================================================
    // NATIVE ESLINT 10 RULES (pre-configured)
    // ==========================================================================

    // eval() and new Function() execute arbitrary code, enabling injection attacks.
    // Pattern: eval(...), new Function(...)
    "no-eval": "error",

    // console.log/debug/info left in production code pollutes output and leaks info.
    // Pattern: console.log(), console.debug(), console.info()
    "no-console": "warn",

    // Code nested too deeply. Use early returns or extract functions.
    // Config: max nesting depth of 4
    "max-depth": ["warn", 4],

    // Empty catch blocks silently swallow errors, hiding bugs.
    // Pattern: catch (e) { }, catch { }
    "no-empty": ["error", { allowEmptyCatch: false }],

    // debugger statements left in production code.
    // Pattern: debugger
    "no-debugger": "error",

    // Functions over 80 lines are hard to test, debug, and maintain.
    // Config: max 80 lines per function
    "max-lines-per-function": ["warn", { max: 80 }],

    // Nested ternary hell.
    // Pattern: ? 'a' : ? 'b' : 'c'
    "no-nested-ternary": "warn",

    // ==========================================================================
    // AI-SPECIFIC TELLS (custom rules)
    // ==========================================================================

    // Comments that restate what the code does are noise. AI generates these constantly.
    // Pattern: // initialize the counter, // set the variable, etc.
    "antislop/no-obvious-comments": "warn",

    // AI writes uncertain comments like "should work" or "might not be the best approach".
    // Pattern: // should work, // hopefully, // might not, // probably not the best
    "antislop/no-hedging-comments": "warn",

    // AI generates numbered step comments like "Step 1: Initialize" that add noise.
    // Pattern: // Step 1:, // Step 2:, etc.
    "antislop/no-step-comments": "warn",

    // AI generates ASCII section dividers like "// ========" that clutter code.
    // Pattern: // ======, // ------, // ~~~~~~
    "antislop/no-section-dividers": "warn",

    // AI scaffolding that ships to production: throw "not implemented", return null, etc.
    // Pattern: throw new Error("not implemented"), throw new Error("TODO")
    "antislop/no-stub-functions": "error",

    // AI writes "This function handles..." style comments that narrate instead of explain.
    // Pattern: // This function handles, // This method creates, etc.
    "antislop/no-narrator-comments": "warn",

    // ==========================================================================
    // SECURITY (custom rules)
    // ==========================================================================

    // Detects API keys, passwords, and tokens hardcoded in source code.
    // Pattern: apiKey = "sk-...", secret = "...", password = "..."
    // NOTE: Consider eslint-plugin-no-secrets for more comprehensive detection
    "antislop/no-hardcoded-secrets": "error",

    // innerHTML and dangerouslySetInnerHTML can introduce XSS vulnerabilities.
    // Pattern: .innerHTML =, dangerouslySetInnerHTML
    "antislop/no-inner-html": "warn",

    // Building SQL queries with string concatenation enables SQL injection.
    // Pattern: `SELECT * FROM users WHERE id = ${id}`, "SELECT" + var
    "antislop/no-sql-concat": "error",

    // ==========================================================================
    // CODE QUALITY (custom rules)
    // ==========================================================================

    // AI assistants leave placeholder TODOs that never get implemented.
    // Pattern: TODO: implement, FIXME: add, HACK: replace
    "antislop/no-todo": "warn",

    // ==========================================================================
    // FRAMEWORK (custom rules)
    // ==========================================================================

    // Async Express route handlers without try/catch crash the server on errors.
    // Pattern: app.get('/', async (req, res) => { ... }) without error handling
    "antislop/no-express-unhandled": "warn",

    // Sending error.message or error.stack to clients leaks internal details.
    // Pattern: res.json({ error: err.message }), res.send(error.stack)
    "antislop/no-error-info-leak": "error",

    // ==========================================================================
    // HALLUCINATED IMPORTS (custom rules)
    // ==========================================================================

    // Detects imports of packages that are known AI hallucinations and don't exist on npm.
    // Pattern: import { useRouter } from '@anthropic/sdk' (should be @anthropic-ai/sdk)
    "antislop/no-hallucinated-imports": "warn",

    // ==========================================================================
    // FROM KARPESTOP ai-slop-detector.ts
    // ==========================================================================

    // Redundant comments explaining variable assignment to itself.
    // Pattern: const count = count; // assign count to count
    "antislop/no-redundant-comments": "warn",

    // AI making unverified assumptions.
    // Pattern: // assuming, // presumably, // it seems
    "antislop/no-assumption-comments": "warn",

    // Overconfident comments.
    // Pattern: // obviously, // clearly, // trivial
    "antislop/no-overconfident-comments": "warn",

    // Unnecessary IIFE wrapper.
    // Pattern: const x = (async () => { ... })()
    "antislop/no-iife-wrapper": "warn",

    // Magic CSS values.
    // Pattern: 1234px, #abc123, rgba(255, 0, 0, 0.5)
    "antislop/no-magic-css": "warn",

    // ==========================================================================
    // CODEBASE HEALTH
    // ==========================================================================

    // Commented-out code blocks that should be deleted.
    // Pattern: // code: ..., /* ... */ with code-like content
    "antislop/no-dead-code-patterns": "warn",

    // @deprecated labels without migration path.
    // Pattern: @deprecated without corresponding migration path
    "antislop/no-deprecated-without-replacement": "warn",

    // ==========================================================================
    // SIMPLICITY
    // ==========================================================================

    // Empty wrapper functions that only call one other function.
    // Pattern: function x() { return y() }
    "antislop/no-boilerplate-wrappers": "warn",

    // Files that only re-export from another module.
    // Pattern: export * from '...'
    "antislop/no-reexport-shims": "warn",

    // ==========================================================================
    // CODE QUALITY
    // ==========================================================================

    // Placeholder strings like 'Lorem ipsum', 'TBD', 'XXX'.
    // Pattern: 'TBD', 'XXX', 'PLACEHOLDER'
    "antislop/no-placeholder-data": "warn",

    // Generic error messages that don't help debugging.
    // Pattern: throw new Error('Error'), throw new Error('Failed')
    "antislop/no-generic-error-messages": "warn",

    // TODO comments without issue tracker reference.
    // Pattern: TODO: without #123 or URL
    "antislop/no-todo-without-issue": "warn",

    // ==========================================================================
    // ERROR HANDLING
    // ==========================================================================

    // Silent fallbacks that hide errors.
    // Pattern: value || defaultValue on required data
    "antislop/no-fallback-defaults": "warn",

    // ==========================================================================
    // TECHNICAL DEBT
    // ==========================================================================

    // Legacy code markers indicate technical debt.
    // Pattern: // legacy, // deprecated, // obsolete, // outdated
    "antislop/no-legacy-markers": "warn",

    // Fallback code indicates incomplete implementation.
    // Pattern: fallback, degrade, graceful degradation
    "antislop/no-fallback-patterns": "warn",

    // No-op code that does nothing.
    // Pattern: noop, no-op, do nothing, empty body
    "antislop/no-noop-patterns": "warn",
  },
};
