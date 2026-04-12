import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    parser: await import("@typescript-eslint/parser"),
  },
});

ruleTester.run("no-type-aliases", testRules.noTypeAliases, {
  valid: [
    {
      code: `
        const x: { name: string } = { name: "test" };
      `,
    },
    {
      code: `
        function test(a: string): boolean {
          return true;
        }
      `,
    },
    {
      code: `
        interface User {
          name: string;
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        type UserId = string;
      `,
      errors: [
        {
          messageId: "type-alias",
        },
      ],
    },
    {
      code: `
        type User = { name: string };
      `,
      errors: [
        {
          messageId: "type-alias",
        },
      ],
    },
    {
      code: `
        type Config = {
          apiUrl: string;
          timeout: number;
        };
      `,
      errors: [
        {
          messageId: "type-alias",
        },
      ],
    },
    {
      code: `
        type Response<T> = { data: T; status: number };
      `,
      errors: [
        {
          messageId: "type-alias",
        },
      ],
    },
    {
      code: `
        type ApiResponse = {
          results: string[];
          total: number;
        };
      `,
      errors: [
        {
          messageId: "type-alias",
        },
      ],
    },
    {
      code: `
        type UserId = string;
        type UserName = string;
        type UserEmail = string;
      `,
      errors: [
        {
          messageId: "type-alias",
        },
        {
          messageId: "type-alias",
        },
        {
          messageId: "type-alias",
        },
      ],
    },
  ],
});
