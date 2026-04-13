import type { AstRule } from "./types.js";
import { createNodeTypeDetect } from "./utils/createRule.js";
import { createFinding } from "./utils/createFinding.js";

const ANY_TYPES = ["TSAnyKeyword", "TSTypeAssertion"];

export const noTsAny: AstRule = {
  id: "no-ts-any",
  name: "No TypeScript any",
  description:
    "`as any` and `: any` bypass the type system. AI uses these to silence type errors.",
  category: "ai-tell",
  severity: "warn",
  languages: ["ts", "tsx"],
  messageId: "no-ts-any",
  messageTemplate:
    "TypeScript `any` type bypasses type safety. Use a specific type.",
  detect: createNodeTypeDetect(ANY_TYPES, (node) => {
    if (node.type === "TSAnyKeyword") {
      return createFinding(
        node,
        "TypeScript `any` type bypasses type safety",
        1,
        {
          messageId: "no-ts-any",
        },
      );
    }

    if (
      node.type === "TSTypeAssertion" &&
      node.typeAnnotation?.type === "TSAnyKeyword"
    ) {
      return createFinding(node, "Type assertion to `any`", 1, {
        messageId: "no-ts-any",
      });
    }
    return;
  }),
};
