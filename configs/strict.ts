/**
 * Strict ESLint configuration for AI slop detection
 *
 * This config raises all warnings to errors for maximum enforcement.
 * Use this in CI/CD or when you want to block AI slop completely.
 */

import type { Linter } from "eslint";
import { config as recommendedConfig } from "./recommended.js";

export const config: Linter.Config = {
  ...recommendedConfig,

  rules: {
    ...recommendedConfig.rules,

    // Native ESLint Rules - Stricter than base
    "no-console": "error",
    "max-depth": ["error", 4],
    "max-lines-per-function": ["error", { max: 80 }],
    "no-nested-ternary": "error",

    // AI-Specific Tells - Error instead of warn
    "antislop/no-obvious-comments": "error",
    "antislop/no-hedging-comments": "error",
    "antislop/no-step-comments": "error",
    "antislop/no-section-dividers": "error",
    "antislop/no-narrator-comments": "error",

    // Code Quality - Error instead of warn
    "antislop/no-todo": "error",

    // Framework - Error instead of warn
    "antislop/no-express-unhandled": "error",

    // Hallucinated Imports - Error instead of warn
    "antislop/no-hallucinated-imports": "error",

    // Additional patterns - Error instead of warn
    "antislop/no-redundant-comments": "error",
    "antislop/no-assumption-comments": "error",
    "antislop/no-overconfident-comments": "error",
    "antislop/no-iife-wrapper": "error",
    "antislop/no-magic-css": "error",

    // Codebase Health - Error instead of warn
    "antislop/no-dead-code-patterns": "error",
    "antislop/no-deprecated-without-replacement": "error",

    // Simplicity - Error instead of warn
    "antislop/no-boilerplate-wrappers": "error",
    "antislop/no-reexport-shims": "error",

    // Code Quality - Error instead of warn
    "antislop/no-placeholder-data": "error",
    "antislop/no-generic-error-messages": "error",
    "antislop/no-todo-without-issue": "error",

    // Error Handling - Error instead of warn
    "antislop/no-fallback-defaults": "error",

    // Technical Debt - Error instead of warn
    "antislop/no-legacy-markers": "error",
    "antislop/no-fallback-patterns": "error",
    "antislop/no-noop-patterns": "error",
  },
};
