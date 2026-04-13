import type { AstRule, AstFinding } from "../types.js";
import type { Rule as ESLintRule } from "eslint";

import { findCommentsMatching } from "../utils.js";

/**
 * Creates a detect function for comment pattern violations with autofix support.
 */
export function createCommentPatternRule(
  patterns: RegExp[],
  antiPatterns: RegExp[],
  messageTemplate: string,
  options?: {
    messageId?: string;
  },
): AstRule["detect"] {
  return function (context: ESLintRule.RuleContext): AstFinding[] {
    const matches = findCommentsMatching(
      context.sourceCode,
      patterns,
      antiPatterns,
    );

    return matches.map(({ line, column, text, rangeStart, rangeEnd }) => ({
      line: line + 1,
      column: column + 1,
      message: messageTemplate.replace("{comment}", text),
      messageId: options?.messageId,
      fix(fixer) {
        const source = context.sourceCode.getText();
        const lineStart = source.lastIndexOf("\n", rangeStart - 1) + 1;
        const lineEnd = source.indexOf("\n", rangeEnd);
        const end = lineEnd === -1 ? source.length : lineEnd + 1;
        return fixer.removeRange([lineStart, end]);
      },
    }));
  };
}
