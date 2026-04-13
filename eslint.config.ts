
import tseslint from "typescript-eslint";
import { plugin as antislopPlugin } from "./lib/plugin.ts";

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    ignores: ["dist/**"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      antislop: antislopPlugin,
    },
    rules: {
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
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-return": "error",
    },
  },
);
