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

/**
 * A finding emitted by a rule's detect function.
 */
export interface AstFinding {
  line: number;
  column: number;
  message: string;
  messageId?: string;
  nodeType?: string;
  value?: string | number | boolean | null;
  fix?(fixer: import("eslint").Rule.RuleFixer):
    | {
        range: [number, number];
        text: string;
      }
    | Iterable<{ range: [number, number]; text: string }>
    | null;
}

/**
 * Standard ESLint-compatible rule with a static messageTemplate.
 * All findings for this rule share the same messageId and messageTemplate.
 */
export interface AstRule {
  id: string;
  name: string;
  description: string;
  category: RuleCategory;
  severity: RuleSeverity;
  languages: SupportedLanguage[];
  messageTemplate: string;
  messageId?: string; // Optional messageId, defaults to id
  detect: (context: import("eslint").Rule.RuleContext) => AstFinding[] | void;
}

/**
 * Rule where each finding has its own dynamically generated message.
 * These rules do not use messageTemplate/messageId — the message is
 * fully formed at detection time (e.g., includes variable names).
 */
export interface DynamicAstRule {
  id: string;
  name: string;
  description: string;
  category: RuleCategory;
  severity: RuleSeverity;
  languages: SupportedLanguage[];
  detect: (context: import("eslint").Rule.RuleContext) => AstFinding[] | void;
}
