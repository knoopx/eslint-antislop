import type { AstFinding } from "../types.js";
import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Create an AstFinding from a node location
 */
export function createFinding(
  node: TSESTree.Node,
  message: string,
  columnOffset: number = 1,
): AstFinding {
  return {
    line: node.loc?.start.line || 1,
    column: (node.loc?.start.column || 0) + columnOffset,
    message,
  };
}
