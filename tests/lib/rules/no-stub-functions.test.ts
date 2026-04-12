import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-stub-functions", testRules.noStubFunctions, {
  valid: [
    {
      code: `
        function validError() {
          throw new Error("Something went wrong");
        }
      `,
    },
    {
      code: `
        function testError() {
          throw new Error("test: expected failure");
        }
      `,
    },
    {
      code: `
        function mockError() {
          throw new Error("mock: not implemented for mock");
        }
      `,
    },
    {
      code: `
        function customError() {
          throw new Error("Custom error message");
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        function notImplemented() {
          throw new Error("Not implemented");
        }
      `,
      errors: [
        {
          messageId: "stub-function",
        },
      ],
    },
    {
      code: `
        function placeholder() {
          throw new Error("TODO: implement this");
        }
      `,
      errors: [
        {
          messageId: "stub-function",
        },
      ],
    },
    {
      code: `
        function stubFunction() {
          throw new Error("Stub function here");
        }
      `,
      errors: [
        {
          messageId: "stub-function",
        },
      ],
    },
    {
      code: `
        function incomplete() {
          throw new Error("FIXME: implement me");
        }
      `,
      errors: [
        {
          messageId: "stub-function",
        },
      ],
    },
    {
      code: `
        function placeholderFunc() {
          throw new Error("Placeholder implementation");
        }
      `,
      errors: [
        {
          messageId: "stub-function",
        },
      ],
    },
  ],
});
