import type { AstRule, AstFinding } from "../types.js";
import type { TSESTree } from "@typescript-eslint/utils";
import { createNodeTypeDetect } from "../utils/createRule.js";

const GENERIC_ERROR_PATTERNS = [
  /^error$/i,
  /^failed$/i,
  /^failure$/i,
  /something\s+went\s+wrong/i,
  /an\s+error\s+occurred/i,
  /unknown\s+error/i,
];

/**
 * Validates if a throw statement contains an Error constructor call.
 */
function isValidErrorThrow(
  node: TSESTree.Node,
): node is TSESTree.ThrowStatement {
  return (
    node.type === "ThrowStatement" &&
    node.argument.type === "NewExpression" &&
    node.argument.callee.type === "Identifier" &&
    node.argument.callee.name === "Error"
  );
}

/**
 * Checks if an error message matches generic error patterns.
 */
function isGenericErrorMessage(value: string): boolean {
  return GENERIC_ERROR_PATTERNS.some((p) => p.test(value));
}

/**
 * Creates a finding for a generic error.
 */
function createFinding(
  node: { loc: { start: { line: number; column: number } } },
  message: string,
): AstFinding {
  return {
    line: node.loc.start.line,
    column: node.loc.start.column + 1,
    message,
  };
}

/**
 * Creates a detect function for generic error messages.
 */
export function createGenericErrorRule(message: string): AstRule["detect"] {
  return createNodeTypeDetect(["ThrowStatement"], (node) => {
    if (!isValidErrorThrow(node)) return [];

    const throwStmt = node as TSESTree.ThrowStatement;
    const args = (throwStmt.argument as TSESTree.NewExpression).arguments || [];
    const findings: AstFinding[] = [];

    for (const arg of args) {
      if (
        arg.type === "Literal" &&
        typeof arg.value === "string" &&
        isGenericErrorMessage(arg.value)
      ) {
        findings.push(
          createFinding(node, message.replace("{message}", arg.value)),
        );
      }
    }

    return findings.length > 0 ? findings : [];
  });
}
