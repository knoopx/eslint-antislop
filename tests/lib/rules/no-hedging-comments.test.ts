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
      errors: [
        {
          messageId: "hedging-comment",
        },
      ],
    },
    {
      code: `
        // Might not be the best approach
        function suboptimal() {}
      `,
      errors: [
        {
          messageId: "hedging-comment",
        },
      ],
    },
    {
      code: `
        // Hopefully this works
        const data = fetchData();
      `,
      errors: [
        {
          messageId: "hedging-comment",
        },
      ],
    },
    {
      code: `
        // Not sure if this is correct
        const result = process(input);
      `,
      errors: [
        {
          messageId: "hedging-comment",
        },
      ],
    },
    {
      code: `
        // This probably isn't the best way
        const x = compute();
      `,
      errors: [
        {
          messageId: "hedging-comment",
        },
      ],
    },
    {
      code: `
        // I'm not sure if this is right
        function questionable() {}
      `,
      errors: [
        {
          messageId: "hedging-comment",
        },
      ],
    },
  ],
});
