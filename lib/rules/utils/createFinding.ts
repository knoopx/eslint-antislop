import type { AstFinding } from "../types.js";
import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Create an AstFinding from a node location.
 */
export function createFinding(
  node: TSESTree.Node,
  message: string,
  columnOffset: number = 1,
  extraDetails?: {
    messageId?: string;
    nodeType?: string;
    value?: string | number | boolean | null;
  },
): AstFinding {
  return {
    line: node.loc?.start.line || 1,
    column: (node.loc?.start.column || 0) + columnOffset,
    message,
    messageId: extraDetails?.messageId,
    nodeType: extraDetails?.nodeType ?? node.type,
    value: extraDetails?.value,
  };
}
