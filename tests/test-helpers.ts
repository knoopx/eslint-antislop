import { RuleTester } from "@typescript-eslint/rule-tester";
import type { TSESLint } from "@typescript-eslint/utils";
import type { InvalidTestCase } from "@typescript-eslint/rule-tester";

/** Type for test cases that assert on messageId. */
type MessageIdTestCase<MessageId extends string> = Omit<
  InvalidTestCase<MessageId, []>,
  "errors"
> & {
  errors?: Array<{ messageId: MessageId }>;
};

/** Type for test cases that assert on dynamic message content. */
type DynamicMessageTestCase = Omit<InvalidTestCase<string, []>, "errors"> & {
  errors?: Array<{ message: string | RegExp }>;
};

/**
 * Creates a RuleTester instance with consistent configuration for all ESLint plugin tests.
 */
export function createRuleTester(): RuleTester {
  return new RuleTester({
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: undefined as TSESLint.Parser.LooseParserModule | undefined,
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

/** Generate test cases where each finding uses the same messageId. */
export function makeMessageIdTests(
  codes: string[],
  messageId: string,
): MessageIdTestCase<string>[] {
  return codes.map((code) => ({ code, errors: [{ messageId }] }));
}

/** Generate test cases where each finding has a dynamic message pattern. */
export function makeDynamicMessageTests(
  patterns: Array<{ code: string; msgPattern: RegExp }>,
): DynamicMessageTestCase[] {
  return patterns.map(({ code, msgPattern }) => ({
    code,
    errors: [{ message: msgPattern }],
  }));
}

/** Generate test cases where each finding has a dynamic message pattern and fix output. */
export function makeDynamicMessageFixTests(
  tests: Array<{
    code: string;
    output?: string;
    msgPattern: RegExp;
  }>,
): DynamicMessageTestCase[] {
  return tests.map(({ code, output, msgPattern }) => ({
    code,
    output,
    errors: [{ message: msgPattern }],
  }));
}

/** Generate test cases with multiple findings per error. */
export function makeMultiErrorTests(
  codes: string[],
  msgPattern: RegExp,
): DynamicMessageTestCase[] {
  return codes.map((code) => ({
    code,
    errors: [{ message: msgPattern }],
  }));
}

/** Creates test cases for the no-overconfident-comments rule. */
export function createOverconfidentCommentTestCases(): DynamicMessageTestCase[] {
  return [
    {
      code: `// Obviously this works`,
      errors: [{ message: /Delete overconfident comment/ }],
    },
    {
      code: `// Clearly the best approach`,
      errors: [{ message: /Delete overconfident comment/ }],
    },
    {
      code: `// Definitely correct`,
      errors: [{ message: /Delete overconfident comment/ }],
    },
    {
      code: `// Of course this will work`,
      errors: [{ message: /Delete overconfident comment/ }],
    },
  ];
}

/** Creates test cases for the placeholder data rule. */
export function createPlaceholderDataTestCases(
  messageId: string,
): MessageIdTestCase<string>[] {
  return makeMessageIdTests(
    [
      `const data = { name: 'John Doe', email: 'test@example.com' };`,
      `const user = { id: 1, name: 'Dummy Name' };`,
      `const config = { api_key: 'xxx-xxx-xxx' };`,
    ],
    messageId,
  );
}

/** Creates invalid test cases for the no-magic-css rule. */
export function createInvalidMagicCssTestCases(): MessageIdTestCase<string>[] {
  return makeMessageIdTests(
    [
      `let styles = { padding: '16px' };`,
      `let theme = { color: '#abcdef' };`,
      `let theme = { color: 'rgba(255, 0, 0, 0.5)' };`,
      `let theme = { color: 'hsl(120, 100%, 50%)' };`,
      `var styles = { padding: '16px' };`,
      `const config = { theme: { color: '#abcdef' } };`,
      `const obj = { padding: '16px' };`,
      `let styles = { padding: '16px' } as const;`,
      `var styles = { padding: '16px' } as const;`,
      `function createStyles() { return { padding: '16px' }; }`,
      `setPadding('16px');`,
      `return { color: '#abcdef' };`,
      `const value = 1; switch(value) { case 1: return '24px'; }`,
      `const [padding] = ['16px'];`,
      `class Styles { padding = '16px'; }`,
      `const obj = { getPadding() { return '16px'; } };`,
      `Object.assign(style, { color: '#ffffff' });`,
      `const style = { ...base, padding: '16px' };`,
      `const style = { background: "rgba(0, 0, 0, 0.5)" };`,
    ],
    "no-magic-css",
  );
}

/** Creates invalid test cases for the no-narrator-comments rule. */
export function createInvalidNarratorCommentTestCases(): DynamicMessageTestCase[] {
  return makeDynamicMessageTests([
    {
      code: `// Calculate the total price\nfunction calculateTotal(items) { const total = items.reduce((sum, item) => sum + item.price, 0); return total; }`,
      msgPattern: /Remove narrator comments/,
    },
    {
      code: `// Get data from the API\nasync function fetchData(url) { const response = await fetch(url); return response.json(); }`,
      msgPattern: /Remove narrator comments/,
    },
    {
      code: `// Add two numbers together\nfunction add(a, b) { return a + b; }`,
      msgPattern: /Remove narrator comments/,
    },
    {
      code: `// Loop through the array\nfor (const item of items) { console.log(item); }`,
      msgPattern: /Remove narrator comments/,
    },
    {
      code: `// Sort the array in ascending order\nfunction sortArray(arr) { return arr.sort(); }`,
      msgPattern: /Remove narrator comments/,
    },
    {
      code: `// Filter out invalid items\nfunction filterItems(items) { return items.filter(i => i.valid); }`,
      msgPattern: /Remove narrator comments/,
    },
    {
      code: `// Check if the user is authenticated\nfunction checkAuth(user) { return user !== null; }`,
      msgPattern: /Remove narrator comments/,
    },
    {
      code: `// Map over the results\nfunction mapResults(results) { return results.map(r => r.id); }`,
      msgPattern: /Remove narrator comments/,
    },
    {
      code: `// Convert to uppercase\nfunction toUpper(str) { return str.toUpperCase(); }`,
      msgPattern: /Remove narrator comments/,
    },
    {
      code: `// Remove duplicates from array\nfunction removeDuplicates(arr) { return [...new Set(arr)]; }`,
      msgPattern: /Remove narrator comments/,
    },
  ]);
}

/** Creates invalid test cases for the no-hallucinated-imports rule. */
export function createInvalidHallucinatedImportsTestCases(): DynamicMessageTestCase[] {
  const packages = [
    "react-hooks",
    "react-native-webview",
    "lodash-es",
    "axios-minified",
    "next-seo-plugin",
    "typescript-utilities",
    "eslint-config-prettier-standard",
    "jest-extended-matchers",
    "react-query-devtools",
  ];

  return packages.map((pkg) => ({
    code: `import something from "${pkg}";`,
    errors: [
      {
        message: `Potentially hallucinated import: '${pkg}'. Verify it exists on npm.`,
      },
    ],
  }));
}
