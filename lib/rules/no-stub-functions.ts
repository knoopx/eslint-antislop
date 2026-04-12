import esquery from "esquery";
import type { Rule as ESLintRule } from "eslint";
import type { AstRule, AstFinding } from "./types.js";
import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Patterns that indicate a stub/unimplemented function
 */
const STUB_PATTERNS = [
  /not\s+implemented/i,
  /todo/i,
  /implement\s+this/i,
  /implement\s+me/i,
  /stub/i,
  /fixme/i,
  /placeholder/i,
];

/**
 * Patterns that should be excluded (abstract, interface, test, mock)
 */
const ANTI_PATTERNS = [/abstract/i, /interface/i, /test/i, /spec/i, /mock/i];

/**
 * Check if an error message is a stub pattern
 */
function isStubMessage(message: string): boolean {
  return STUB_PATTERNS.some((p) => p.test(message));
}

/**
 * Check if an error message should be excluded
 */
function shouldExcludeMessage(message: string): boolean {
  return ANTI_PATTERNS.some((p) => p.test(message));
}

/**
 * Check a throw statement for stub patterns
 */
function checkThrowStatement(node: TSESTree.ThrowStatement): AstFinding | null {
  if (node.argument?.type !== "NewExpression") {
    return null;
  }

  const callee = node.argument.callee;
  if (callee?.type !== "Identifier" || callee.name !== "Error") {
    return null;
  }

  const args = node.argument.arguments || [];
  for (const arg of args) {
    if (arg.type !== "Literal" || typeof arg.value !== "string") {
      continue;
    }

    const errorMsg = arg.value;
    if (shouldExcludeMessage(errorMsg)) {
      continue;
    }

    if (isStubMessage(errorMsg)) {
      return {
        line: node.loc.start.line,
        column: node.loc.start.column + 1,
        message: "Stub function detected. Implement it or remove it.",
      };
    }
  }

  return null;
}

export const noStubFunctions: AstRule = {
  id: "no-stub-functions",
  name: "No Stub Functions",
  description:
    'AI scaffolding that ships to production: throw "not implemented", return null, etc.',
  category: "ai-tell",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "stub-function",
  messageTemplate: "Stub function detected. Implement it or remove it.",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const findings: AstFinding[] = [];

    const throwStatements = esquery(
      context.sourceCode.ast,
      "ThrowStatement",
    ) as TSESTree.ThrowStatement[];

    for (const node of throwStatements) {
      const finding = checkThrowStatement(node);
      if (finding) {
        findings.push(finding);
      }
    }

    return findings;
  },
};
