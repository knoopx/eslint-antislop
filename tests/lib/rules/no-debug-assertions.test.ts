import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-debug-assertions", testRules.noDebugAssertions, {
  valid: [
    {
      code: `
          function doSomething() {
            return 42;
          }
        `,
    },
    {
      code: `
          console.log("hello");
        `,
    },
    {
      code: `
          console.error("error");
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
          debugger;
        `,
      errors: [
        {
          messageId: "debug-statement",
        },
      ],
    },
    {
      code: `
          function check() {
            debugger;
            return true;
          }
        `,
      errors: [
        {
          messageId: "debug-statement",
        },
      ],
    },
    {
      code: `
          console.assert(condition, "message");
        `,
      errors: [
        {
          messageId: "debug-statement",
        },
      ],
    },
    {
      code: `
          function validate() {
            console.assert(x > 0, "x must be positive");
          }
        `,
      errors: [
        {
          messageId: "debug-statement",
        },
      ],
    },
    {
      code: `
          debugger;
          console.assert(condition);
        `,
      errors: [
        {
          messageId: "debug-statement",
        },
        {
          messageId: "debug-statement",
        },
      ],
    },
  ],
});
