import type { AstRule } from "./types.js";
import { createCommentPatternRule } from "./rule-helpers.js";

export const noObviousComments: AstRule = {
  id: "no-obvious-comments",
  name: "No Obvious Comments",
  description: "Reports comments that restate code functionality.",
  category: "ai-tell",
  severity: "info",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "obvious-comment",
  messageTemplate:
    "Comment restates what the code does. Remove it or explain WHY instead.",
  detect: createCommentPatternRule(
    [
      /^(?:increment|decrement|initialize|declare|define|create|set|get|return|check|loop|iterate|import|require|export|assign|call|invoke|update|fetch|retrieve|store|save|log|print|handle|process)\s+(?:the\s+)?(?:a\s+)?\w+$/i,
    ],
    [
      /eslint-disable/i,
      /@ts-\w+/i,
      /@(param|returns|typedef|type)/i,
      /\b(?:TODO|FIXME|NOTE|HACK|BUG|WARN)\b/i,
    ],
    "Comment restates what the code does.",
  ),
};
