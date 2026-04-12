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
    {
      code: `
        it("should work", () => {
          expect(true).toBe(true);
        });
      `,
    },
    {
      code: `
        describe("test suite", () => {
          test("works", () => {});
        });
      `,
    },
    {
      code: `
        it.todo("should work later");
      `,
    },
    {
      code: `
        test.skipIf(false)("conditional skip", () => {});
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
      errors: [
        {
          messageId: "skipped-test",
        },
      ],
    },
    {
      code: `
        it.skip("should work", () => {
          expect(true).toBe(true);
        });
      `,
      errors: [
        {
          messageId: "skipped-test",
        },
      ],
    },
    {
      code: `
        describe.skip("test suite", () => {
          test("works", () => {});
        });
      `,
      errors: [
        {
          messageId: "skipped-test",
        },
      ],
    },
    {
      code: `
        xdescribe("test suite", () => {
          it("works", () => {});
        });
      `,
      errors: [
        {
          messageId: "skipped-test",
        },
      ],
    },
    {
      code: `
        xit("should work", () => {});
      `,
      errors: [
        {
          messageId: "skipped-test",
        },
      ],
    },
    {
      code: `
        xtest("should work", () => {});
      `,
      errors: [
        {
          messageId: "skipped-test",
        },
      ],
    },
  ],
});
