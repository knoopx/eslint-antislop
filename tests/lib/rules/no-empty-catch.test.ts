import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-empty-catch", testRules.noEmptyCatch, {
  valid: [
    {
      code: `
        try {
          doSomething();
        } catch (e) {
          logger.error(e);
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
      errors: [{ messageId: "no-empty-catch" }],
    },
    {
      code: `
        try {
          doSomething();
        } catch (e) {
          // do nothing
        }
      `,
      errors: [{ messageId: "no-empty-catch" }],
    },
    {
      code: `
        try {
          doSomething();
        } catch (e) {
          /* ignore */
        }
      `,
      errors: [{ messageId: "no-empty-catch" }],
    },
    {
      code: `
        try {
          doSomething();
        } catch (e) {
          // TODO: handle error
        }
      `,
      errors: [{ messageId: "no-empty-catch" }],
    },
    {
      code: `
        try {
          doSomething();
        } catch (e) {
          // FIXME: fix error handling
        }
      `,
      errors: [{ messageId: "no-empty-catch" }],
    },
  ],
});
