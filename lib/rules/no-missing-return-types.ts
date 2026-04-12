import type { Rule as ESLintRule } from "eslint";
import type { AstRule, AstFinding } from "./types.js";
import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Check if a node is an exported function without return type
 */
function checkFunctionDeclaration(node: TSESTree.Node): AstFinding | null {
  if (node.type !== "FunctionDeclaration") {
    return null;
  }

  const funcDecl = node as {
    returnType?: TSESTree.Node;
    id?: TSESTree.Node;
    body?: TSESTree.Node;
  };
  
  // Skip functions with return types
  if (funcDecl.returnType) {
    return null;
  }

  const id = funcDecl.id as { name?: string };
  if (id?.name && funcDecl.body) {
    return {
      line: node.loc.start.line,
      column: node.loc.start.column + 1,
      message: `Exported function '${id.name}' missing return type annotation`,
    };
  }

  return null;
}

/**
 * Check if a variable declaration has an explicit type annotation
 */
function hasTypeAnnotation(decl: TSESTree.Node): boolean {
  return (decl as { typeAnnotation?: TSESTree.Node }).typeAnnotation != null;
}

/**
 * Check if a declaration has a function initializer
 */
function hasFunctionInitializer(
  decl: TSESTree.Node
): boolean {
  const init = (decl as { init?: TSESTree.Node }).init;
  return (
    init != null &&
    (init.type === "ArrowFunctionExpression" ||
      init.type === "FunctionExpression")
  );
}

/**
 * Check if an arrow function expression has a return type
 */
function arrowFuncHasReturnType(
  init: TSESTree.Node
): boolean {
  if (init.type !== "ArrowFunctionExpression") {
    return false;
  }
  const arrowFunc = init as { returnType?: TSESTree.Node };
  return arrowFunc.returnType != null;
}

/**
 * Get the function name from a variable declaration
 */
function getFunctionName(decl: TSESTree.Node): string | null {
  const id = (decl as { id?: { name?: string } }).id;
  return id?.name ?? null;
}

/**
 * Create a finding for a function missing return type
 */
function createFinding(node: TSESTree.Node, name: string): AstFinding {
  return {
    line: node.loc.start.line,
    column: node.loc.start.column + 1,
    message: `Exported function '${name}' missing return type annotation`,
  };
}

/**
 * Check if a variable declaration is an arrow/function expression without return type
 */
function checkVariableDeclaration(node: TSESTree.Node): AstFinding | null {
  if (node.type !== "VariableDeclaration") {
    return null;
  }

  const varDecl = node as {
    declarations?: TSESTree.Node[];
    declare?: boolean;
    const?: boolean;
  };

  // Check each declaration
  for (const decl of varDecl.declarations || []) {
    // Skip if has explicit type annotation
    if (hasTypeAnnotation(decl)) {
      continue;
    }

    // Skip if not a function initializer
    if (!hasFunctionInitializer(decl)) {
      continue;
    }

    const init = (decl as { init?: TSESTree.Node }).init!;

    // Skip if arrow function has return type
    if (arrowFuncHasReturnType(init)) {
      continue;
    }

    // Get function name and create finding
    const name = getFunctionName(decl);
    if (name) {
      return createFinding(node, name);
    }
  }

  return null;
}

export const noMissingReturnTypes: AstRule = {
  id: "no-missing-return-types",
  name: "No Missing Return Types",
  description: "Public functions must have explicit return type annotations.",
  category: "code-quality",
  severity: "warn",
  languages: ["ts", "tsx"],
  messageId: "missing-return-type",
  messageTemplate: "Exported function missing return type annotation.",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const findings: AstFinding[] = [];
    const sourceCode = context.sourceCode;

    for (const node of sourceCode.ast.body) {
      if (!node || typeof node !== "object") {
        continue;
      }

      const astNode = node as TSESTree.Node;
      let finding: AstFinding | null = null;

      finding = checkFunctionDeclaration(astNode);
      if (!finding) {
        finding = checkVariableDeclaration(astNode);
      }

      if (finding) {
        findings.push(finding);
      }
    }

    return findings;
  },
};
