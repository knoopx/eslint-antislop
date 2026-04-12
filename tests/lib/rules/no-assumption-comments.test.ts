import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-assumption-comments", testRules.noAssumptionComments, {
  valid: [
    {
      code: `
        // This function processes data
        function processData() {}
      `,
    },
    {
      code: `
        // TODO: implement this
        function placeholder() {}
      `,
    },
    {
      code: `
        console.log("test");
      `,
    },
  ],
  invalid: [
    {
      code: `
        // Assuming this will work
        function test() {}
      `,
      errors: [
        {
          messageId: "no-assumption-comments",
        },
      ],
    },
    {
      code: `
        // Assumes the data is valid
        const data = input.data;
      `,
      errors: [
        {
          messageId: "no-assumption-comments",
        },
      ],
    },
    {
      code: `
        // I assume this is correct
        const x = compute();
      `,
      errors: [
        {
          messageId: "no-assumption-comments",
        },
      ],
    },
    {
      code: `
        // Presumably this works
        const result = process(input);
      `,
      errors: [
        {
          messageId: "no-assumption-comments",
        },
      ],
    },
    {
      code: `
        // Apparently this is the right way
        const solution = applyMethod();
      `,
      errors: [
        {
          messageId: "no-assumption-comments",
        },
      ],
    },
    {
      code: `
        // It seems like this should work
        function tryIt() {}
      `,
      errors: [
        {
          messageId: "no-assumption-comments",
        },
      ],
    },
    {
      code: `
        // Seems like the correct approach
        const approach = method();
      `,
      errors: [
        {
          messageId: "no-assumption-comments",
        },
      ],
    },
    {
      code: `
        // Assuming this will work, but may not
        function uncertain() {}
      `,
      errors: [
        {
          messageId: "no-assumption-comments",
        },
      ],
    },
  ],
});
