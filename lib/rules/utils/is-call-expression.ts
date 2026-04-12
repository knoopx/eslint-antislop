import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Check if a node is a CallExpression with a specific name
 */
export function isCallExpressionWith(
  node: TSESTree.Node,
  name: string | RegExp,
): boolean {
  if (node.type !== "CallExpression") return false;
  const callee = node.callee;

  if (callee.type === "Identifier") {
    if (typeof name === "string") {
      return callee.name === name;
    }
    return name.test(callee.name);
  }

  if (callee.type === "MemberExpression") {
    const object = callee.object;
    const property = callee.property;

    if (object.type === "Identifier" && property.type === "Identifier") {
      const fullName = `${object.name}.${property.name}`;
      if (typeof name === "string") {
        return fullName === name;
      }
      return name.test(fullName);
    }
  }

  return false;
}

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
