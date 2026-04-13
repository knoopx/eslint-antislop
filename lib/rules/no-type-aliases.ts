import type { AstRule } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
import type { TSESTree } from "@typescript-eslint/utils";

function isPrimitiveTypeReference(typeAnnotation: TSESTree.TypeNode): boolean {
  return (
    typeAnnotation.type === "TSTypeReference" ||
    typeAnnotation.type === "TSStringKeyword" ||
    typeAnnotation.type === "TSNumberKeyword" ||
    typeAnnotation.type === "TSBooleanKeyword" ||
    typeAnnotation.type === "TSNullKeyword" ||
    typeAnnotation.type === "TSUndefinedKeyword" ||
    typeAnnotation.type === "TSAnyKeyword" ||
    typeAnnotation.type === "TSUnknownKeyword" ||
    typeAnnotation.type === "TSVoidKeyword" ||
    typeAnnotation.type === "TSObjectKeyword" ||
    typeAnnotation.type === "TSBigIntKeyword" ||
    typeAnnotation.type === "TSNeverKeyword" ||
    typeAnnotation.type === "TSThisType"
  );
}

function isStringLiteralUnion(typeAnnotation: TSESTree.TypeNode): boolean {
  if (typeAnnotation.type !== "TSUnionType") {
    return false;
  }
  return typeAnnotation.types.every(
    (t) =>
      t.type === "TSLiteralType" &&
      t.literal.type === "Literal" &&
      typeof t.literal.value === "string",
  );
}

function isInferedFromSchema(typeAnnotation: TSESTree.TypeNode): boolean {
  if (typeAnnotation.type !== "TSTypeReference") {
    return false;
  }
  const typeName = typeAnnotation.typeName;
  if (typeName.type === "Identifier") {
    // Matches Static<typeof X> from Zod schemas (z.infer)
    return typeName.name === "Static";
  }
  return false;
}

export const noTypeAliases: AstRule = {
  id: "no-type-aliases",
  name: "No Type Aliases",
  description:
    "Simple type aliases that just reference another type add indirection without value.",
  category: "simplicity",
  severity: "warn",
  languages: ["ts", "tsx"],
  messageId: "no-type-alias",
  messageTemplate:
    "Type alias detected. Use the original type directly instead of creating an alias.",
  detect(context: ESLintRule.RuleContext) {
    const findings: Array<{
      line: number;
      column: number;
      message: string;
    }> = [];
    const sourceCode = context.sourceCode;

    for (const node of sourceCode.ast.body) {
      const bodyNode = node as unknown as TSESTree.TSTypeAliasDeclaration;
      if (
        bodyNode.type === "TSTypeAliasDeclaration" &&
        bodyNode.loc &&
        bodyNode.id
      ) {
        // Skip string literal unions - these document allowed values
        if (isStringLiteralUnion(bodyNode.typeAnnotation)) {
          continue;
        }
        // Skip types inferred from Zod schemas (Static<typeof X>)
        if (isInferedFromSchema(bodyNode.typeAnnotation)) {
          continue;
        }
        if (!isPrimitiveTypeReference(bodyNode.typeAnnotation)) {
          continue;
        }
        findings.push({
          line: bodyNode.loc.start.line,
          column: bodyNode.loc.start.column + 1,
          message: `Type alias '${bodyNode.id.name}' detected. Use the original type directly.`,
        });
      }
    }

    return findings;
  },
};
