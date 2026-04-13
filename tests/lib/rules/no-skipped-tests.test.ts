import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-skipped-tests", testRules.noSkippedTests, {
  valid: [
    {
      code: `
        test("should work", () => {
          expect(1).toBe(1);
        });
      `,
    },
  ],
  invalid: [
    {
      code: `
        test.skip("should work", () => {
          expect(1).toBe(1);
        });
      `,
      errors: [{ message: /Skipped test detected/ }],
    },
    {
      code: `
        it.skip("should work", () => {
          expect(true).toBe(true);
        });
      `,
      errors: [{ message: /Skipped test detected/ }],
    },
    {
      code: `
        describe.skip("test suite", () => {
          test("works", () => {});
        });
      `,
      errors: [{ message: /Skipped test detected/ }],
    },
    {
      code: `
        xdescribe("test suite", () => {
          it("works", () => {});
        });
      `,
      errors: [{ message: /Skipped test detected/ }],
    },
    {
      code: `
        xit("should work", () => {});
      `,
      errors: [{ message: /Skipped test detected/ }],
    },
    {
      code: `
        xtest("should work", () => {});
      `,
      errors: [{ message: /Skipped test detected/ }],
    },
  ],
} as unknown as Parameters<typeof ruleTester.run>[2]);
