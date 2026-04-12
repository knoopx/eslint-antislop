import { testRules } from "../../../lib/rules/test-utils.js";
import { createAsyncRuleTester } from "../../test-helpers.js";

const ruleTester = await createAsyncRuleTester();

ruleTester.run("no-ts-any", testRules.noTsAny, {
  valid: [
    {
      code: `
        const x: number = 5;
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
        const arr: string[] = ["a", "b", "c"];
      `,
    },
    {
      code: `
        const obj: { name: string } = { name: "test" };
      `,
    },
  ],
  invalid: [
    {
      code: `
        const x: any = 5;
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: `
        const x: any = "value";
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: `
        const fn = (arg: any): any => arg;
      `,
      errors: [
        {
          messageId: "default",
        },
        {
          messageId: "default",
        },
      ],
    },
    {
      code: `
        const arr: any[] = [1, 2, 3];
      `,
      errors: [
        {
          messageId: "default",
        },
        {
          messageId: "default",
        },
      ],
    },
    {
      code: `
        const data: any[] = fetchData();
      `,
      errors: [
        {
          messageId: "default",
        },
        {
          messageId: "default",
        },
      ],
    },
    {
      code: `
        const value = data as any;
      `,
      errors: [
        {
          messageId: "default",
        },
        {
          messageId: "default",
        },
      ],
    },
    {
      code: `
        const value = something as any;
      `,
      errors: [
        {
          messageId: "default",
        },
        {
          messageId: "default",
        },
      ],
    },
    {
      code: `
        function processData(data: any): any {
          return data;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
        {
          messageId: "default",
        },
      ],
    },
  ],
});
