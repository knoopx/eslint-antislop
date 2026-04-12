import esquery from "esquery";
import type { Rule as ESLintRule } from "eslint";
import type { AstRule, AstFinding } from "./types.js";
import type { TSESTree } from "@typescript-eslint/utils";

/**
 * SQL keywords that indicate a potential SQL query
 */
const SQL_KEYWORDS = /^(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE)/i;

/**
 * Check if a node is a SQL keyword literal
 */
function isSqlKeywordLiteral(
  node: TSESTree.Expression | null | undefined,
): string | null {
  if (!node) {
    return null;
  }

  if (node.type === "Literal" && typeof node.value === "string") {
    return node.value;
  }

  if (node.type === "TemplateLiteral" && node.quasis.length === 1) {
    return node.quasis[0].value.raw;
  }

  return null;
}

/**
 * Check for SQL queries using template literals with interpolation
 */
function checkTemplateLiteral(
  node: TSESTree.TemplateLiteral,
): AstFinding | null {
  const firstExpr = node.quasis[0]?.value?.raw || "";

  if (SQL_KEYWORDS.test(firstExpr) && node.expressions.length > 0) {
    return {
      line: node.loc.start.line,
      column: node.loc.start.column + 1,
      message:
        "SQL query with string interpolation detected - use parameterized query",
    };
  }

  return null;
}

/**
 * Check for SQL queries using binary expression concatenation
 */
function checkBinaryExpression(
  node: TSESTree.BinaryExpression,
): AstFinding | null {
  if (node.operator !== "+") {
    return null;
  }

  const leftStr = isSqlKeywordLiteral(node.left);
  const rightStr = isSqlKeywordLiteral(node.right);

  if (leftStr && SQL_KEYWORDS.test(leftStr)) {
    return {
      line: node.loc.start.line,
      column: node.loc.start.column + 1,
      message:
        "SQL query with string concatenation detected - use parameterized query",
    };
  }

  if (rightStr && SQL_KEYWORDS.test(rightStr)) {
    return {
      line: node.loc.start.line,
      column: node.loc.start.column + 1,
      message:
        "SQL query with string concatenation detected - use parameterized query",
    };
  }

  return null;
}

export const noSqlConcat: AstRule = {
  id: "no-sql-concat",
  name: "No SQL String Concatenation",
  description:
    "Building SQL queries with string concatenation enables SQL injection.",
  category: "security",
  severity: "error",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "sql-concat",
  messageTemplate:
    "SQL query built with string concatenation. Use parameterized queries.",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const findings: AstFinding[] = [];

    const nodes = esquery(
      context.sourceCode.ast,
      "TemplateLiteral, BinaryExpression[operator='+']",
    ) as (TSESTree.TemplateLiteral | TSESTree.BinaryExpression)[];

    for (const node of nodes) {
      let finding: AstFinding | null = null;

      if (node.type === "TemplateLiteral") {
        finding = checkTemplateLiteral(node);
      } else if (node.type === "BinaryExpression" && node.operator === "+") {
        finding = checkBinaryExpression(node);
      }

      if (finding) {
        findings.push(finding);
      }
    }

    return findings;
  },
};
