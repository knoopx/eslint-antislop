import esquery from "esquery";
import type { Rule as ESLintRule } from "eslint";
import type { AstRule, AstFinding } from "./types.js";
import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Pattern to identify potential secret variable/property names
 */
const SECRET_NAME_PATTERN =
  /^(api[_-]?key|secret|password|passwd|token|auth[_-]?token|access[_-]?key|private[_-]?key)$/i;

/**
 * Pattern to identify safe/placeholder values that shouldn't trigger alerts
 */
const SAFE_PATTERN =
  /(process\.env|import\.meta\.env|ENV\[|config\.|getenv|os\.environ|example|placeholder|xxx|your[_-]|<[A-Z_]+>|test|mock|fake|dummy|sample)/i;

/**
 * Check if a name is a potential secret
 */
function isPotentialSecret(name: string): boolean {
  return SECRET_NAME_PATTERN.test(name) && !SAFE_PATTERN.test(name);
}

/**
 * Check if a string value is a likely hardcoded secret
 */
function isLikelyHardcodedSecret(value: string): boolean {
  return value.length >= 16;
}

/**
 * Check a variable declarator for hardcoded secrets
 */
function checkVariableDeclarator(
  node: TSESTree.VariableDeclarator,
): AstFinding | null {
  if (node.id?.type !== "Identifier") {
    return null;
  }

  const varName = node.id.name;
  if (!isPotentialSecret(varName)) {
    return null;
  }

  if (
    node.init?.type === "Literal" &&
    typeof node.init.value === "string" &&
    isLikelyHardcodedSecret(node.init.value)
  ) {
    return {
      line: node.loc.start.line,
      column: node.loc.start.column + 1,
      message: `Potential hardcoded secret in variable '${varName}'`,
    };
  }

  return null;
}

/**
 * Check a property for hardcoded secrets
 */
function checkProperty(node: TSESTree.Property): AstFinding | null {
  if (node.key?.type !== "Identifier") {
    return null;
  }

  const keyName = node.key.name;
  if (!isPotentialSecret(keyName)) {
    return null;
  }

  if (
    node.value?.type === "Literal" &&
    typeof node.value.value === "string" &&
    isLikelyHardcodedSecret(node.value.value)
  ) {
    return {
      line: node.loc.start.line,
      column: node.loc.start.column + 1,
      message: `Potential hardcoded secret in property '${keyName}'`,
    };
  }

  return null;
}

export const noHardcodedSecrets: AstRule = {
  id: "no-hardcoded-secrets",
  name: "No Hardcoded Secrets",
  description:
    "Detects API keys, passwords, and tokens hardcoded in source code.",
  category: "security",
  severity: "error",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs", "py"],
  messageId: "hardcoded-secret",
  messageTemplate:
    "Hardcoded secret detected. Use environment variables instead.",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const findings: AstFinding[] = [];

    const nodes = esquery(
      context.sourceCode.ast,
      "VariableDeclarator, Property",
    ) as (TSESTree.VariableDeclarator | TSESTree.Property)[];

    for (const node of nodes) {
      let finding: AstFinding | null = null;

      if (node.type === "VariableDeclarator") {
        finding = checkVariableDeclarator(node);
      } else if (node.type === "Property") {
        finding = checkProperty(node);
      }

      if (finding) {
        findings.push(finding);
      }
    }

    return findings;
  },
};
