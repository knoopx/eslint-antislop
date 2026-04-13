import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-todo-without-issue", testRules.noTodoWithoutIssue, {
  valid: [
    {
      code: `
        // TODO: implement this - see issue #123
        function feature() {}
      `,
    },
  ],
  invalid: [
    {
      code: `
        // TODO: implement this
        function feature() {}
      `,
      errors: [{ message: /TODO without issue reference/ }],
    },
    {
      code: `
        // TODO: fix this later
        function fixLater() {}
      `,
      errors: [{ message: /TODO without issue reference/ }],
    },
    {
      code: `
        // TODO: add new feature
        function newFeature() {}
      `,
      errors: [{ message: /TODO without issue reference/ }],
    },
    {
      code: `
        // TODO: refactor this
        function refactoring() {}
      `,
      errors: [{ message: /TODO without issue reference/ }],
    },
    {
      code: `
        // TODO: remove this
        function remove() {}
      `,
      errors: [{ message: /TODO without issue reference/ }],
    },
  ],
} as unknown as Parameters<typeof ruleTester.run>[2]);
