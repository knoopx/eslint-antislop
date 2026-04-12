import { RuleTester } from "@typescript-eslint/rule-tester";
import type { TSESLint } from "@typescript-eslint/utils";
import type { InvalidTestCase } from "@typescript-eslint/rule-tester";

/**
 * Creates a RuleTester instance with consistent configuration for all ESLint plugin tests.
 * This eliminates duplication across test files.
 */
export function createRuleTester(): RuleTester {
  return new RuleTester({
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: undefined as TSESLint.Parser.LooseParserModule | undefined, // Set per-rule when needed
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: "readonly",
      },
    },
  });
}

/**
 * Creates a RuleTester instance with JSX enabled and parser already configured.
 * Use when parser is imported dynamically at top level.
 */
export async function createAsyncRuleTester(): Promise<RuleTester> {
  const parser = await import("@typescript-eslint/parser");
  
  return new RuleTester({
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  });
}

type RuleTestError<MessageId extends string> = InvalidTestCase<MessageId, []>;

/**
 * Creates test cases for magic CSS values rule.
 */
export function createMagicCssTestCases(
  message: string,
  ruleName: string
): RuleTestError<string>[] {
  return [
    {
      code: `const styles = { padding: '16px' };`,
      errors: [{ messageId: ruleName }],
    },
    {
      code: `const theme = { color: '#abcdef' };`,
      errors: [{ messageId: ruleName }],
    },
    {
      code: `const theme = { color: 'rgba(255, 0, 0, 0.5)' };`,
      errors: [{ messageId: ruleName }],
    },
    {
      code: `const theme = { color: 'hsl(120, 100%, 50%)' };`,
      errors: [{ messageId: ruleName }],
    },
  ];
}

/**
 * Creates test cases for overconfident comments rule.
 */
export function createOverconfidentCommentTestCases(
  message: string,
  ruleName: string
): RuleTestError<string>[] {
  return [
    {
      code: `// Obviously this works`,
      errors: [{ messageId: ruleName }],
    },
    {
      code: `// Clearly the best approach`,
      errors: [{ messageId: ruleName }],
    },
    {
      code: `// Definitely correct`,
      errors: [{ messageId: ruleName }],
    },
    {
      code: `// Of course this will work`,
      errors: [{ messageId: ruleName }],
    },
  ];
}

/**
 * Creates test cases for placeholder data rule.
 */
export function createPlaceholderDataTestCases(
  message: string,
  ruleName: string
): RuleTestError<string>[] {
  return [
    {
      code: `const data = { name: 'John Doe', email: 'test@example.com' };`,
      errors: [{ messageId: ruleName }],
    },
    {
      code: `const user = { id: 1, name: 'Dummy Name' };`,
      errors: [{ messageId: ruleName }],
    },
    {
      code: `const config = { api_key: 'xxx-xxx-xxx' };`,
      errors: [{ messageId: ruleName }],
    },
  ];
}
