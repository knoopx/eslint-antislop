import type { AstRule } from "./types.js";
import type { TSESTree } from "@typescript-eslint/utils";
import { createCallExpressionDetect } from "./utils/createRule.js";
import { createFinding } from "./utils/createFinding.js";

const FUNCTION_TYPE_KEYWORDS = [
  "FunctionExpression",
  "ArrowFunctionExpression",
] as const;

export const noIifeWrapper: AstRule = {
  id: "no-iife-wrapper",
  name: "No IIFE Wrapper",
  description: "Unnecessary IIFE wrappers create visual noise.",
  category: "noise",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx"],
  messageId: "no-unnecessary-iife",
  messageTemplate:
    "Unnecessary IIFE wrapper. Consider a top-level async function or direct module execution.",
  detect: createCallExpressionDetect((node) => {
    const callExpr = node as { callee?: TSESTree.Node };
    const callee = callExpr.callee;
    const isFunctionType =
      callee &&
      FUNCTION_TYPE_KEYWORDS.includes(
        callee.type as (typeof FUNCTION_TYPE_KEYWORDS)[number],
      );

    if (isFunctionType) {
      return createFinding(
        node,
        "Unnecessary IIFE wrapper - use top-level async or direct execution",
        1,
        {
          messageId: "no-unnecessary-iife",
        },
      );
    }
    return;
  }),
};
