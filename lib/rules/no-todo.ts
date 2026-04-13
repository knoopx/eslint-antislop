import type { DynamicAstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
import { findCommentsMatching } from "./utils.js";

export const noTodo: DynamicAstRule = {
  id: "no-todo",
  name: "No TODO Comments",
  description:
    "Comments marked as TODO, FIXME, or XXX indicate incomplete work.",
  category: "technical-debt",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx"],
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const patterns = [
      /\bTODO\b/i,
      /\bFIXME\b/i,
      /\bXXX\b/i,
      /\bHACK\b/i,
      /\bNOTE\b/i,
    ];

    const findings = findCommentsMatching(context.sourceCode, patterns);

    return findings.map((f) => ({
      line: f.line,
      column: f.column,
      message: `${f.text} comment found. Remove incomplete work markers (TODO, FIXME, XXX, HACK). Either complete the work and delete the comment, or if work-in-progress, replace with a specific issue tracker reference like "See issue #123". Delete vague AI-generated TODOs.`,
    }));
  },
};
