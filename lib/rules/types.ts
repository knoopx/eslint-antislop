/**
 * Type definitions for eslint-config-antislop rules
 *
 * All rules are AST-based.
 */




type RuleCategory =
  | "ai-tell"
  | "security"
  | "error-handling"
  | "code-quality"
  | "framework"
  | "hallucination"
  | "noise"
  | "style"
  | "react"
  | "hallucinated-imports"
  | "codebase-health"
  | "simplicity"
  | "testing"
  | "linting"
  | "technical-debt";

type RuleSeverity = "error" | "warn" | "info";

type SupportedLanguage =
  | "js"
  | "ts"
  | "jsx"
  | "tsx"
  | "mjs"
  | "cjs"
  | "py"
  | "vue"
  | "svelte"
  | string;

export interface AstFinding {
  line: number;
  column: number;
  message: string;
}

export interface AstRule {
  id: string;
  name: string;
  description: string;
  category: RuleCategory;
  severity: RuleSeverity;
  languages: SupportedLanguage[];
  messageTemplate: string;
  messageId?: string;  // Optional messageId, defaults to id
  detect: (context: import("eslint").Rule.RuleContext) => AstFinding[] | void;
}
