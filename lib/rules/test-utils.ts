/**
 * Test utilities for ESLint rules
 *
 * Re-exports all rules wrapped for use with ESLint's RuleTester
 */

import { wrapRule } from "../rule-wrapper.js";
import * as Rules from "./base.js";
import type { AstRule } from "./types.js";
import type { TSESLint } from "@typescript-eslint/utils";

/**
 * Create a wrapped version of a rule for testing with ESLint's RuleTester.
 * Uses 'unknown' cast to bypass nested @typescript-eslint dependency type conflicts.
 */
function createTestRule(
  rule: unknown,
  name: string,
): TSESLint.RuleModule<string, readonly unknown[]> {
  if (rule && typeof rule === "object" && "detect" in rule) {
    return wrapRule(rule as AstRule) as unknown as TSESLint.RuleModule<string, readonly unknown[]>;
  }
  if (rule && typeof rule === "object" && "create" in rule) {
    return rule as unknown as TSESLint.RuleModule<string, readonly unknown[]>;
  }
  throw new Error(`Rule ${name} must have a detect or create method`);
}

/**
 * Re-export all rules wrapped for RuleTester compatibility
 * Uses kebab-case keys to match rule IDs
 */
export const testRules = Object.fromEntries(
  Object.entries(Rules).map(([name, rule]) => [
    name,
    createTestRule(rule, name),
  ]),
) as Record<string, TSESLint.RuleModule<string, readonly unknown[]>>;
