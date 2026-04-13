import tseslint from "typescript-eslint";
import type { Linter } from "eslint";
import { plugin } from "../lib/plugin.js";

export const config: Linter.Config[] = [
  // TypeScript recommended config
  ...tseslint.configs.recommended,

  // All AI slop rules
  {
    plugins: {
      antislop: plugin,
    },

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      // Native ESLint 10 rules
      "no-eval": "error",
      "no-console": "error",
      "no-empty": ["error", { allowEmptyCatch: false }],
      "no-debugger": "error",
      "max-depth": ["error", 4],
      "max-lines-per-function": ["error", { max: 80 }],
      "max-classes-per-file": ["error", 1],
      "max-statements": ["error", 30],
      "max-params": ["error", 4],
      "no-multiple-empty-lines": ["error", { max: 2, maxBOF: 1, maxEOF: 0 }],
      "no-else-return": ["error", { allowElseIf: false }],

      // AI-specific tells (custom rules)
      "antislop/no-obvious-comments": "error",
      "antislop/no-hedging-comments": "error",
      "antislop/no-step-comments": "error",
      "antislop/no-section-dividers": "error",
      "antislop/no-stub-functions": "error",
      "antislop/no-narrator-comments": "error",
      "antislop/no-redundant-comments": "error",
      "antislop/no-assumption-comments": "error",
      "antislop/no-overconfident-comments": "error",
      "antislop/no-iife-wrapper": "error",

      // Security
      "antislop/no-hardcoded-secrets": "error",
      "antislop/no-inner-html": "error",

      // Code quality
      "antislop/no-todo": "error",
      "antislop/no-placeholder-data": "error",
      "antislop/no-generic-error-messages": "error",
      "antislop/no-todo-without-issue": "error",
      "antislop/no-fallback-defaults": "error",
      "antislop/no-legacy-markers": "error",
      "antislop/no-fallback-patterns": "error",
      "antislop/no-noop-patterns": "error",

      // Security
      "antislop/no-error-info-leak": "error",

      // Hallucinated imports
      "antislop/no-hallucinated-imports": "error",

      // Codebase health
      "antislop/no-dead-code-patterns": "error",
      "antislop/no-deprecated-without-replacement": "error",

      // Simplicity
      "antislop/no-boilerplate-wrappers": "error",
      "antislop/no-reexport-shims": "error",

      // TypeScript-specific patterns
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-confusing-void-expression": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-empty-interface": [
        "error",
        { allowSingleExtends: true },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/prefer-for-of": "error",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-floating-promises": "error",

      // TS-specific AI rules
      "antislop/no-type-aliases": "error",
      "antislop/no-import-aliases": "error",
    },
  },

  // Allow longer test functions (describe/it blocks)
  {
    files: ["**/*.test.{ts,tsx,js,jsx}", "**/*.spec.{ts,tsx,js,jsx}"],
    rules: {
      "max-lines-per-function": ["error", { max: 200 }],
    },
  },
];
