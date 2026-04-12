import type { AstRule } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
import { findCommentsMatching } from "./utils.js";

export const noTodo: AstRule = {
  id: "no-todo",
  name: "No TODO Comments",
  description:
    "Comments marked as TODO, FIXME, or XXX indicate incomplete work.",
  category: "technical-debt",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx"],
  messageId: "default",
  messageTemplate:
    "TODO/FIXME/XXX comments indicate incomplete work. Resolve or remove them.",
  detect(
    context: ESLintRule.RuleContext,
  ): Array<{ line: number; column: number; message: string }> {
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
      message: `${f.text} comment found - resolve or remove`,
    }));
  },
};
