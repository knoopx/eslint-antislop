import type { AstRule } from "../types.js";
import type { TSESTree } from "@typescript-eslint/utils";
import { createImportDetect } from "../utils/createRule.js";

/**
 * Validates if an import node is from the specified package.
 */
function isFromPackage(node: TSESTree.Node, packageName: string): boolean {
  const importNode = node as {
    source?: TSESTree.Literal;
    specifiers?: TSESTree.Node[];
  };
  return (
    importNode.source?.type === "Literal" &&
    importNode.source.value === packageName
  );
}

/**
 * Checks if an import specifier is a hallucinated API.
 */
function isHallucinatedSpecifier(
  spec: TSESTree.Node,
  hallucinatedAPIs: Set<string>,
): spec is TSESTree.ImportSpecifier {
  return (
    spec.type === "ImportSpecifier" &&
    spec.imported?.type === "Identifier" &&
    hallucinatedAPIs.has(spec.imported.name)
  );
}

/**
 * Creates a finding for a hallucinated import.
 */
/**
 * Creates a finding for a hallucinated import.
 */
function createFinding(
  node: { loc: { start: { line: number; column: number } } },
  api: string,
  packageName: string,
  messageTemplate: string,
): {
  line: number;
  column: number;
  message: string;
} {
  const message = messageTemplate
    .replace("{api}", api)
    .replace("{package}", packageName);

  return {
    line: node.loc.start.line,
    column: node.loc.start.column + 1,
    message,
  };
}

/**
 * Creates a rule detect function that checks for hallucinated imports from a specific package.
 */
export function createHallucinatedImportRule(
  packageName: string,
  hallucinatedAPIs: Set<string>,
  messageTemplate: string,
): AstRule["detect"] {
  return createImportDetect((node) => {
    if (!isFromPackage(node, packageName)) return;

    const importNode = node as { specifiers?: TSESTree.Node[] };
    const specifiers = importNode.specifiers || [];
    const findings = [];

    for (const spec of specifiers) {
      if (isHallucinatedSpecifier(spec, hallucinatedAPIs)) {
        const specifierNode = spec as { imported?: { name: string } };
        findings.push(
          createFinding(
            node,
            specifierNode.imported!.name,
            packageName,
            messageTemplate,
          ),
        );
      }
    }

    return findings.length > 0 ? findings : undefined;
  });
}
