import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-iife-wrapper", testRules.noIifeWrapper, {
  valid: [
    {
      code: `
        const result = Math.random();
      `,
    },
    {
      code: `
        console.log("hello");
      `,
    },
    {
      code: `
        fetch("/api").then(res => res.json());
      `,
    },
    {
      code: `
        const x = 5;
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
      errors: [
        {
          messageId: "unnecessary-iife",
        },
      ],
    },
    {
      code: `
        (function() {
          const x = 5;
          return x * 2;
        })();
      `,
      errors: [
        {
          messageId: "unnecessary-iife",
        },
      ],
    },
    {
      code: `
        (() => {
          console.log("arrow IIFE");
        })();
      `,
      errors: [
        {
          messageId: "unnecessary-iife",
        },
      ],
    },
    {
      code: `
        (async function() {
          await doSomething();
        })();
      `,
      errors: [
        {
          messageId: "unnecessary-iife",
        },
      ],
    },
    {
      code: `
        ((x, y) => x + y)(1, 2);
      `,
      errors: [
        {
          messageId: "unnecessary-iife",
        },
      ],
    },
    {
      code: `
        (function helper() {
          return 42;
        })();
      `,
      errors: [
        {
          messageId: "unnecessary-iife",
        },
      ],
    },
  ],
});
