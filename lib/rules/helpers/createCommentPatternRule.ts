import type { AstRule, AstFinding } from "../types.js";
import type { Rule as ESLintRule } from "eslint";

import { findCommentsMatching } from "../utils.js";

/**
 * Creates a detect function for comment pattern violations
 */
export function createCommentPatternRule(
  patterns: RegExp[],
  antiPatterns: RegExp[],
  messageTemplate: string,
): AstRule["detect"] {
  return function (context: ESLintRule.RuleContext): AstFinding[] {
    const matches = findCommentsMatching(
      context.sourceCode,
      patterns,
      antiPatterns,
    );

    return matches.map(({ line, column, text }) => ({
      line: line + 1,
      column: column + 1,
      message: messageTemplate.replace("{comment}", text),
    }));
  };
}
