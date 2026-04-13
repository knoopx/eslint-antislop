import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-hedging-comments", testRules.noHedgingComments, {
  valid: [
    {
      code: `
        // This function processes data
        function process() {}
      `,
    },
    {
      code: `
        // TODO: fix this later
        function buggy() {}
      `,
    },
    {
      code: `
        // @ts-expect-error: expected
        const x: number = "string";
      `,
    },
  ],
  invalid: [
    {
      code: `
        // This should work fine
        function test() {}
      `,
      output: `
        function test() {}
      `,
      errors: [{ message: /Delete uncertain hedging comment/ }],
    },
    {
      code: `
        // Might not be the best approach
        function suboptimal() {}
      `,
      output: `
        function suboptimal() {}
      `,
      errors: [{ message: /Delete uncertain hedging comment/ }],
    },
    {
      code: `
        // Hopefully this works
        const data = fetchData();
      `,
      output: `
        const data = fetchData();
      `,
      errors: [{ message: /Delete uncertain hedging comment/ }],
    },
    {
      code: `
        // Not sure if this is correct
        const result = process(input);
      `,
      output: `
        const result = process(input);
      `,
      errors: [{ message: /Delete uncertain hedging comment/ }],
    },
    {
      code: `
        // This probably isn't the best way
        const x = compute();
      `,
      output: `
        const x = compute();
      `,
      errors: [{ message: /Delete uncertain hedging comment/ }],
    },
    {
      code: `
        // I'm not sure if this is right
        function questionable() {}
      `,
      output: `
        function questionable() {}
      `,
      errors: [{ message: /Delete uncertain hedging comment/ }],
    },
  ],
} as unknown as Parameters<typeof ruleTester.run>[2]);
