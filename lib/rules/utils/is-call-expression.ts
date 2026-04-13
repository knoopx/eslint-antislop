import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Check if a node is a CallExpression with a member property
 */
export function isCallExpressionWithMember(
  node: TSESTree.Node,
  propertyName: string,
): boolean {
  return (
    node.type === "CallExpression" &&
    node.callee?.type === "MemberExpression" &&
    node.callee.property?.type === "Identifier" &&
    node.callee.property.name === propertyName
  );
}
