import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-iife-wrapper", testRules.noIifeWrapper, {
  valid: [
    {
      code: `
        async function main() {
          await doSomething();
        }
        main();
      `,
    },
  ],
  invalid: [
    {
      code: `
        (function() {
          console.log("IIFE");
        })();
      `,
      errors: [{ messageId: "no-unnecessary-iife" }],
    },
    {
      code: `
        (function() {
          const x = 5;
          return x * 2;
        })();
      `,
      errors: [{ messageId: "no-unnecessary-iife" }],
    },
    {
      code: `
        (() => {
          console.log("arrow IIFE");
        })();
      `,
      errors: [{ messageId: "no-unnecessary-iife" }],
    },
    {
      code: `
        (async function() {
          await doSomething();
        })();
      `,
      errors: [{ messageId: "no-unnecessary-iife" }],
    },
    {
      code: `
        ((x, y) => x + y)(1, 2);
      `,
      errors: [{ messageId: "no-unnecessary-iife" }],
    },
    {
      code: `
        (function helper() {
          return 42;
        })();
      `,
      errors: [{ messageId: "no-unnecessary-iife" }],
    },
  ],
});
