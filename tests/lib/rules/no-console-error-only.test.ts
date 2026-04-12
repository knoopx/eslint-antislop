import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-console-error-only", testRules.noConsoleErrorOnly, {
  valid: [
    {
      code: `
        try {
          doSomething();
        } catch (error) {
          console.error("Error occurred", error);
          throw error;
        }
      `,
    },
    {
      code: `
        try {
          doSomething();
        } catch (error) {
          logger.error("Error", { error, context: "foo" });
          throw error;
        }
      `,
    },
    {
      code: `
        try {
          doSomething();
        } catch (error) {
          handleException(error);
        }
      `,
    },
    {
      code: `
        try {
          doSomething();
        } catch (error) {
          logError(error);
          throw new Error("Handled");
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
      errors: [
        {
          messageId: "no-console-error-only",
        },
      ],
    },
    {
      code: `
        try {
          doSomething();
        } catch (error) {
          console.error("Failed to process");
        }
      `,
      errors: [
        {
          messageId: "no-console-error-only",
        },
      ],
    },
    {
      code: `
        try {
          doSomething();
        } catch (error) {
          console.error(error);
        }
      `,
      errors: [
        {
          messageId: "no-console-error-only",
        },
      ],
    },
    {
      code: `
        try {
          doSomething();
        } catch (error) {
          console.error(error.message);
        }
      `,
      errors: [
        {
          messageId: "no-console-error-only",
        },
      ],
    },
    {
      code: `
        try {
          doSomething();
        } catch (error) {
          console.error("Error", error.stack);
        }
      `,
      errors: [
        {
          messageId: "no-console-error-only",
        },
      ],
    },
  ],
});
