import type { AstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
import { findCommentsMatching } from "./utils.js";

export const noRedundantComments: AstRule = {
  id: "no-redundant-comments",
  name: "No Redundant Comments",
  description: "Redundant comments explaining variable assignment to itself.",
  category: "noise",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "no-redundant-comment",
  messageTemplate: "Remove redundant comment",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const antiPatterns = [/eslint-disable/i, /@ts-\w+/i];

    const matches = findCommentsMatching(
      context.sourceCode,
      [
        /.\s*(?:variable.*assigned|setting.*value|declaring.*const|initializing.*let)/i,
      ],
      antiPatterns,
    );

    return matches.map((m) => ({
      line: m.line,
      column: m.column + 1,
      message:
        "Delete this redundant comment. Code like `const x = 1` needs no comment. Explain WHY a value matters, not WHAT assignment does. Remove AI-generated filler comments.",
      fix(fixer) {
        return fixer.removeRange([m.rangeStart, m.rangeEnd]);
      },
    }));
  },
};
