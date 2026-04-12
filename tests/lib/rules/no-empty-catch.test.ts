import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-empty-catch", testRules.noEmptyCatch, {
  valid: [
    {
      code: `
        try {
          doSomething();
        } catch (e) {
          console.error(e);
        }
      `,
    },
    {
      code: `
        try {
          doSomething();
        } catch (e) {
          logger.error("Failed", e);
        }
      `,
    },
    {
      code: `
        try {
          doSomething();
        } catch (e) {
          throw new Error("Failed: " + e.message);
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        try {
          doSomething();
        } catch (e) {
        }
      `,
      errors: [
        {
          messageId: "empty-catch",
        },
      ],
    },
    {
      code: `
        try {
          doSomething();
        } catch (e) {
          // do nothing
        }
      `,
      errors: [
        {
          messageId: "empty-catch",
        },
      ],
    },
    {
      code: `
        try {
          doSomething();
        } catch (e) {
          /* ignore */
        }
      `,
      errors: [
        {
          messageId: "empty-catch",
        },
      ],
    },
    {
      code: `
        try {
          doSomething();
        } catch (e) {
          // TODO: handle error
        }
      `,
      errors: [
        {
          messageId: "empty-catch",
        },
      ],
    },
    {
      code: `
        try {
          doSomething();
        } catch (e) {
          // FIXME: fix error handling
        }
      `,
      errors: [
        {
          messageId: "empty-catch",
        },
      ],
    },
  ],
});
