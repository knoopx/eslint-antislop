import type { Rule as ESLintRule } from "eslint";

/**
 * Find comments matching specific patterns
 *
 * @param sourceCode - ESLint SourceCode object
 * @param patterns - Array of regex patterns to match
 * @param antiPatterns - Array of patterns to exclude (e.g., eslint-disable, @ts-expect-error)
 * @returns Array of matching comments with their locations
 */
export function findCommentsMatching(
  sourceCode: ESLintRule.RuleContext["sourceCode"],
  patterns: RegExp[],
  antiPatterns?: RegExp[],
): Array<{
  line: number;
  column: number;
  text: string;
  type: string;
  rangeStart: number;
  rangeEnd: number;
}> {
  const findings: Array<{
    line: number;
    column: number;
    text: string;
    type: string;
    rangeStart: number;
    rangeEnd: number;
  }> = [];
  const comments = sourceCode.getAllComments();

  for (const comment of comments) {
    const text = comment.value.trim();

    if (antiPatterns?.some((p) => p.test(text))) {
      continue;
    }

    if (patterns.some((p) => p.test(text))) {
      findings.push({
        line: comment.loc?.start.line || 0,
        column: comment.loc?.start.column || 0,
        text,
        type: comment.type,
        rangeStart: comment.range![0],
        rangeEnd: comment.range![1]!,
      });
    }
  }

  return findings;
}
