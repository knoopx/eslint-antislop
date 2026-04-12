import type { AstRule, AstFinding } from "./types.js";

export const noRedundantComments: AstRule = {
  id: "no-redundant-comments",
  name: "No Redundant Comments",
  description: "Redundant comments explaining variable assignment to itself.",
  category: "noise",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "redundant-comment",
  messageTemplate:
    "Redundant comment explaining variable assignment to itself.",
  detect(): AstFinding[] {
    const findings: AstFinding[] = [];

    // This rule is better handled with regex as it needs to correlate
    // variable declarations with adjacent comments
    // For AST-based version, we'd need to track comment attachment to nodes
    return findings;
  },
};
