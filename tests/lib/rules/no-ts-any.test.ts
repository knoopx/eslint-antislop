import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-ts-any", testRules.noTsAny, {
  valid: [
    {
      code: `
        const x: string = "value";
      `,
    },
  ],
  invalid: [
    {
      code: `
        const x: any = 5;
      `,
      errors: [{ messageId: "no-ts-any" }],
    },
    {
      code: `
        const x: any = "value";
      `,
      errors: [{ messageId: "no-ts-any" }],
    },
    {
      code: `
        const fn = (arg: any): any => arg;
      `,
      errors: [{ messageId: "no-ts-any" }, { messageId: "no-ts-any" }],
    },
    {
      code: `
        const arr: any[] = [1, 2, 3];
      `,
      errors: [{ messageId: "no-ts-any" }],
    },
    {
      code: `
        const data: any[] = fetchData();
      `,
      errors: [{ messageId: "no-ts-any" }],
    },
    {
      code: `
        const value = data as any;
      `,
      errors: [{ messageId: "no-ts-any" }],
    },
    {
      code: `
        const value = something as any;
      `,
      errors: [{ messageId: "no-ts-any" }],
    },
    {
      code: `
        function processData(data: any): any {
          return data;
        }
      `,
      errors: [{ messageId: "no-ts-any" }, { messageId: "no-ts-any" }],
    },
  ],
});
