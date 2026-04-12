import type { AstRule } from "./types.js";
import { createCallExpressionDetect } from "./utils/createRule.js";
import { createFinding } from "./utils/createFinding.js";
import { isCallExpressionWithMember } from "./utils/is-call-expression.js";
import type { TSESTree } from "@typescript-eslint/utils";

const SKIPPED_TEST_FUNCTIONS = ["xdescribe", "xit", "xtest"];

export const noSkippedTests: AstRule = {
  id: "no-skipped-tests",
  name: "No Skipped Tests",
  description:
    "Skipped tests (`.skip`, `xdescribe`, `xit`) create blind spots in test coverage. AI often leaves these in.",
  category: "testing",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx"],
  messageId: "skipped-test",
  messageTemplate:
    "Skipped tests create blind spots. Fix, delete, or use `it.todo()` instead.",
  detect: createCallExpressionDetect((node, context) => {
    const callNode = node as TSESTree.CallExpression;
    const sourceCode = context.sourceCode;

    if (isCallExpressionWithMember(callNode, "skip")) {
        const start = callNode.callee.range![0];
      const end = callNode.callee.range![1];
      const fullText = sourceCode.getText().substring(start, end);
      const match = fullText.match(/(\w+)\.skip/);
      const funcName = match ? match[1] : "test";
      return createFinding(
        callNode,
        `Skipped test detected (${funcName}.skip)`,
      );
    }

    if (
      callNode.callee?.type === "Identifier" &&
      SKIPPED_TEST_FUNCTIONS.includes(callNode.callee.name)
    ) {
      return createFinding(
        callNode,
        `Skipped test detected (${callNode.callee.name})`,
      );
    }

    return;
  }),
};
