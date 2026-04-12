import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-step-comments", testRules.noStepComments, {
  valid: [
    {
      code: `
        // This is a normal comment without step numbering
        function test() {
          return "test";
        }
      `,
    },
    {
      code: `
        // This function initializes the variable
        const x = 5;
      `,
    },
  ],
  invalid: [
    {
      code: `
        // Step 1: Initialize
        function test() {
          return "test";
        }
      `,
      errors: [
        {
          messageId: "step-comment",
        },
      ],
    },
    {
      code: `
        // Step 1: Initialize
        const x = 5;
      `,
      errors: [
        {
          messageId: "step-comment",
        },
      ],
    },
    {
      code: `
        // Step 1: Initialize the variable
        const x = 5;
      `,
      errors: [
        {
          messageId: "step-comment",
        },
      ],
    },
    {
      code: `
        // Step 2: Process the data
        const data = processData(input);
      `,
      errors: [
        {
          messageId: "step-comment",
        },
      ],
    },
    {
      code: `
        // Step 3: Return the result
        return result;
      `,
      errors: [
        {
          messageId: "step-comment",
        },
      ],
    },
    {
      code: `
        // Step 1: setup
        const setup = () => {};
      `,
      errors: [
        {
          messageId: "step-comment",
        },
      ],
    },
    {
      code: `
        // Step 2: teardown
        const teardown = () => {};
      `,
      errors: [
        {
          messageId: "step-comment",
        },
      ],
    },
    {
      code: `
        // Step 1: First step
        // Step 2: Second step
        const x = 5;
      `,
      errors: [
        {
          messageId: "step-comment",
        },
        {
          messageId: "step-comment",
        },
      ],
    },
  ],
});
