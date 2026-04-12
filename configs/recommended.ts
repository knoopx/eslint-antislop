/**
 * Recommended ESLint configuration for AI slop detection
 *
 * This is the main config that combines base rules with sensible defaults.
 */

import type { Linter } from "eslint";
import { config as baseConfig } from "./base.js";

export const config: Linter.Config = {
  ...baseConfig,

  // Override rules with recommended severity levels
  rules: {
    ...baseConfig.rules,

    // AI-Specific Tells - Recommended Severity
    "antislop/no-stub-functions": "error",

    // Security - Always error
    "antislop/no-hardcoded-secrets": "error",
    "antislop/no-sql-concat": "error",

    // Framework - Error for security issues
    "antislop/no-error-info-leak": "error",
  },
};
