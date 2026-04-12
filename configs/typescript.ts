/**
 * TypeScript-specific ESLint configuration for AI slop detection
 *
 * Adds TypeScript-specific rules to catch AI slop patterns like:
 * - `any` type usage
 * - `as any` assertions
 * - Missing type annotations
 * - Unsafe type patterns
 */

import tseslint from "typescript-eslint";
import type { Linter } from "eslint";
import { config as baseConfig } from "./base.js";

export const config: Linter.Config[] = [
  // Start with TypeScript recommended config
  ...tseslint.configs.recommended,

  // Add base AI slop rules
  {
    ...baseConfig,
    languageOptions: {
      ...baseConfig.languageOptions,
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...baseConfig.rules,

      // ==========================================================================
      // TYPESCRIPT-SPECIFIC PATTERNS
      // ==========================================================================

      // TypeScript `any` types bypass the type system. AI uses these to silence type errors.
      // Replaces: antislop/no-ts-any
      "@typescript-eslint/no-explicit-any": [
        "error",
        {
          ignoreRestArgs: false,
          ignoreParameters: false,
          ignoreParametersWithDefault: false,
          ignoreArrayGenerics: false,
          ignoreRestParameterAssignments: false,
        },
      ],

      // `as any` assertions bypass type safety
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",

      // Prefer `unknown` over `any` for values that could be anything
      "@typescript-eslint/prefer-unknown": "warn",

      // No unsafe type assertions (double assertion like `as any as Type`)
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",

      // No `as const` abuse (AI often uses this incorrectly)
      "@typescript-eslint/no-confusing-void-expression": "warn",

      // No unused vars (catches unused AI-generated code)
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

      // No empty interfaces/types (AI scaffolding)
      "@typescript-eslint/no-empty-interface": [
        "error",
        {
          allowSingleExtends: true,
        },
      ],

      // No non-null assertions (!) which bypass type safety
      "@typescript-eslint/no-non-null-assertion": "warn",

      // No `require` calls (use imports instead)
      "@typescript-eslint/no-require-imports": "error",

      // Prefer `for of` over `for` loops with array indexing
      "@typescript-eslint/prefer-for-of": "warn",

      // Prefer `nullish coalescing` over `||` for null/undefined checks
      "@typescript-eslint/prefer-nullish-coalescing": "warn",

      // Prefer `optional chaining` over conditional access
      "@typescript-eslint/prefer-optional-chain": "warn",

      // No `var` declarations (use `let` or `const`)
      "@typescript-eslint/no-var-requires": "error",

      // Consistent type imports
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      // Prefer `interface` over `type` for object shapes
      "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],

      // No `Promise<any>` - unhandled promises
      "@typescript-eslint/no-floating-promises": "error",

      // TypeScript-specific: Exported functions missing return type annotation
      "antislop/no-missing-return-types": "warn",

      // TypeScript-specific: Async functions that don't await anything
      "antislop/no-async-without-await": "warn",

      // No type aliases (adds indirection)
      "antislop/no-type-aliases": "warn",

      // No import aliases (adds indirection)
      "antislop/no-import-aliases": "warn",
    },
  },
];
