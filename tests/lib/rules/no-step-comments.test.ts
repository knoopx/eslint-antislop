import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

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
  ],
  invalid: [
    {
      code: `
        // Step 1: Initialize
        function test() {
          return "test";
        }
      `,
      output: `
        function test() {
          return "test";
        }
      `,
      errors: [{ messageId: "no-step-comment" }],
    },
    {
      code: `
        // Step 1: Initialize
        const x = 5;
      `,
      output: `
        const x = 5;
      `,
      errors: [{ messageId: "no-step-comment" }],
    },
    {
      code: `
        // Step 1: Initialize the variable
        const x = 5;
      `,
      output: `
        const x = 5;
      `,
      errors: [{ messageId: "no-step-comment" }],
    },
    {
      code: `
        // Step 2: Process the data
        const data = processData(input);
      `,
      output: `
        const data = processData(input);
      `,
      errors: [{ messageId: "no-step-comment" }],
    },
    {
      code: `
        // Step 3: Return the result
        return result;
      `,
      output: `
        return result;
      `,
      errors: [{ messageId: "no-step-comment" }],
    },
    {
      code: `
        // Step 1: setup
        const setup = () => {};
      `,
      output: `
        const setup = () => {};
      `,
      errors: [{ messageId: "no-step-comment" }],
    },
    {
      code: `
        // Step 2: teardown
        const teardown = () => {};
      `,
      output: `
        const teardown = () => {};
      `,
      errors: [{ messageId: "no-step-comment" }],
    },
    {
      code: `
        // Step 1: First step
        // Step 2: Second step
        const x = 5;
      `,
      output: [
        `
        // Step 2: Second step
        const x = 5;
      `,
        `
        const x = 5;
      `,
      ],
      errors: [
        { messageId: "no-step-comment" },
        { messageId: "no-step-comment" },
      ],
    },
  ],
});
