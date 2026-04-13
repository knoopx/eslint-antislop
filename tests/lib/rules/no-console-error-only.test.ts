import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-console-error-only", testRules.noConsoleErrorOnly, {
  valid: [
    {
      code: `
        try {
          doSomething();
        } catch (error) {
          throw error;
        }
      `,
    },
    {
      code: `
        try {
          doSomething();
        } catch (error) {
          logger.error(error);
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        try {
          doSomething();
        } catch (error) {
          console.error("Error");
        }
      `,
      errors: [{ messageId: "no-console-error-only" }],
    },
    {
      code: `
        try {
          doSomething();
        } catch (error) {
          console.error("Failed to process");
        }
      `,
      errors: [{ messageId: "no-console-error-only" }],
    },
    {
      code: `
        try {
          doSomething();
        } catch (error) {
          console.error(error);
        }
      `,
      errors: [{ messageId: "no-console-error-only" }],
    },
    {
      code: `
        try {
          doSomething();
        } catch (error) {
          console.error(error.message);
        }
      `,
      errors: [{ messageId: "no-console-error-only" }],
    },
    {
      code: `
        try {
          doSomething();
        } catch (error) {
          console.error("Error", error.stack);
        }
      `,
      errors: [{ messageId: "no-console-error-only" }],
    },
  ],
});
