import type { AstRule } from "./types.js";
import { createNodeTypeDetect } from "./utils/createRule.js";
import { createFinding } from "./utils/createFinding.js";

const ANY_TYPES = [
  "TSAnyKeyword",
  "TSArrayType",
  "TSTypeAssertion",
  "TSAsExpression",
];

export const noTsAny: AstRule = {
  id: "no-ts-any",
  name: "No TypeScript any",
  description:
    "`as any` and `: any` bypass the type system. AI uses these to silence type errors.",
  category: "ai-tell",
  severity: "warn",
  languages: ["ts", "tsx"],
  messageId: "default",
  messageTemplate:
    "TypeScript `any` type bypasses type safety. Use a specific type.",
  detect: createNodeTypeDetect(ANY_TYPES, (node) => {
    if (node.type === "TSAnyKeyword") {
      return createFinding(node, "TypeScript `any` type bypasses type safety");
    }

    if (
      node.type === "TSArrayType" &&
      node.elementType?.type === "TSAnyKeyword"
    ) {
      return createFinding(node, "TypeScript `any` type in array element");
    }

    if (
      (node.type === "TSTypeAssertion" || node.type === "TSAsExpression") &&
      node.typeAnnotation?.type === "TSAnyKeyword"
    ) {
      return createFinding(node, "Type assertion to `any`");
    }
    return;
  }),
};
