import type { AstRule } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
import { findCommentsMatching } from "./utils.js";

export const noLegacyMarkers: AstRule = {
  id: "no-legacy-markers",
  name: "No Legacy Markers",
  description:
    "Legacy code markers indicate technical debt. Legacy code is addressed, not worked around.",
  category: "technical-debt",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs", "py"],
  messageId: "legacy-marker",
  messageTemplate:
    "Legacy code marker found. Remove the old code or complete the migration.",
  detect(
    context: ESLintRule.RuleContext,
  ): Array<{ line: number; column: number; message: string }> {
    const patterns = [
      /legacy/i,
      /deprecated/i,
      /obsolete/i,
      /outdated/i,
      /old[_\s]?(?:code|version|implementation)/i,
    ];

    const antiPatterns = [
      /eslint-disable/i,
      /migration/i,
      /removed/i,
      /replaced\s/i,
      /deleted/i,
    ];

    return findCommentsMatching(context.sourceCode, patterns, antiPatterns).map(
      (f) => ({
        line: f.line,
        column: f.column,
        message: "Legacy code marker found",
      }),
    );
  },
};
