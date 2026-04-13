import type { AstRule } from "../types.js";
import type { TSESTree } from "@typescript-eslint/utils";
import { createTraversalDetect } from "../utils/createRule.js";

/**
 * Creates a finding for a hallucinated package import.
 */
function createHallucinatedPackageFinding(
  node: TSESTree.Node,
  packageName: string,
  messageTemplate: string,
) {
  return {
    line: node.loc.start.line,
    column: node.loc.start.column + 1,
    message: messageTemplate.replace("{package}", packageName),
  };
}

/**
 * Validates if a node is an ImportDeclaration with a literal source.
 */
function isValidImportDeclaration(
  node: TSESTree.Node,
): node is TSESTree.ImportDeclaration {
  return (
    node.type === "ImportDeclaration" &&
    node.source?.type === "Literal" &&
    typeof node.source.value === "string"
  );
}

/**
 * Validates if a node is a require() call with a literal argument.
 */
function isValidRequireCall(
  node: TSESTree.Node,
): node is TSESTree.CallExpression {
  return (
    node.type === "CallExpression" &&
    node.callee?.type === "Identifier" &&
    node.callee.name === "require" &&
    node.arguments?.[0]?.type === "Literal" &&
    typeof node.arguments[0].value === "string"
  );
}

/**
 * Creates a detect function for hallucinated package imports.
 */
export function createHallucinatedPackageRule(
  hallucinatedSet: Set<string>,
  messageTemplate: string,
): AstRule["detect"] {
  return createTraversalDetect("*", (node) => {
    if (isValidImportDeclaration(node)) {
      const source = node.source.value;
      if (hallucinatedSet.has(source)) {
        return [
          createHallucinatedPackageFinding(node, source, messageTemplate),
        ];
      }
    } else if (isValidRequireCall(node)) {
      const firstArg = node.arguments[0];
      if (firstArg.type === "Literal" && typeof firstArg.value === "string") {
        const source = firstArg.value;
        if (hallucinatedSet.has(source)) {
          return [
            createHallucinatedPackageFinding(node, source, messageTemplate),
          ];
        }
      }
    }
    return [];
  });
}
