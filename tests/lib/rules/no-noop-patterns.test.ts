import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-noop-patterns", testRules.noNoopPatterns, {
  valid: [
    {
      code: `
        // Intentionally empty for now
        function placeholder() {}
      `,
    },
    {
      code: `
        // Abstract method - implement later
        abstract class Base {}
      `,
    },
    {
      code: `
        // Interface definition
        interface MyInterface {}
      `,
    },
    {
      code: `
        // Test case
        function test() {}
      `,
      filename: "test.ts",
    },
    {
      code: `
        // Mock implementation
        function mock() {}
      `,
      filename: "mock.ts",
    },
    {
      code: `
        // eslint-disable-next-line @rule-tester/no-noop-patterns
        // noop placeholder
        function placeholder() {}
      `,
    },
  ],
  invalid: [
    {
      code: `
        // noop placeholder
        function doNothing() {}
      `,
      errors: [
        {
          messageId: "noop-pattern",
        },
      ],
    },
    {
      code: `
        // no-op function
        function placeholder() {}
      `,
      errors: [
        {
          messageId: "noop-pattern",
        },
      ],
    },
    {
      code: `
        // no operation needed here
        function process() {}
      `,
      errors: [
        {
          messageId: "noop-pattern",
        },
      ],
    },
    {
      code: `
        // do nothing for now
        function placeholder() {}
      `,
      errors: [
        {
          messageId: "noop-pattern",
        },
      ],
    },
    {
      code: `
        // empty body
        function handler() {}
      `,
      errors: [
        {
          messageId: "noop-pattern",
        },
      ],
    },
    {
      code: `
        // empty function stub
        function stub() {}
      `,
      errors: [
        {
          messageId: "noop-pattern",
        },
      ],
    },
  ],
});
