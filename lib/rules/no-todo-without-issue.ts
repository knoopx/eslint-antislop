import type { DynamicAstRule } from "./types.js";
import { createCommentPatternDetectOld } from "./utils/createRule.js";

const TODO_PATTERN = /TODO\b/i;
const ISSUE_PATTERNS = [/#\d+/, /https?:\/\//i, /\bissue\b/i, /\bticket\b/i];

export const noTodoWithoutIssue: DynamicAstRule = {
  id: "no-todo-without-issue",
  name: "No TODO Without Issue",
  description:
    "TODO comments without issue tracker reference. Every TODO must have a ticket.",
  category: "code-quality",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs", "py"],
  detect: createCommentPatternDetectOld(
    [TODO_PATTERN],
    "TODO without issue reference. Add a ticket number or URL.",
    ISSUE_PATTERNS,
  ),
};
