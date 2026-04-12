/**
 * ESLint configuration for eslint-config-antislop project itself
 * Uses the antislop plugin to test the rules against this repository
 */

import tseslint from "typescript-eslint";
import { plugin as antislopPlugin } from "./lib/plugin.ts";

export default tseslint.config(
  {
    plugins: {
      antislop: antislopPlugin,
    },
  },
  {
    ignores: ["dist/**"],
  },
  ...tseslint.configs.recommended,
);
