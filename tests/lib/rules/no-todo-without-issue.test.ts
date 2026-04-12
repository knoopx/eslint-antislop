import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-todo-without-issue", testRules.noTodoWithoutIssue, {
  valid: [
    {
      code: `
        // TODO: #123 - implement this
        function feature() {}
      `,
    },
    {
      code: `
        // TODO: https://github.com/repo/issues/123
        function feature() {}
      `,
    },
    {
      code: `
        // TODO: issue tracker ticket 456
        function feature() {}
      `,
    },
    {
      code: `
        // TODO: ticket number 789
        function feature() {}
      `,
    },
    {
      code: `
        // FIXME: #123 - fix the bug
        function fixBug() {}
      `,
    },
    {
      code: `
        // FIXME: see issue #456
        function fixSomething() {}
      `,
    },
  ],
  invalid: [
    {
      code: `
        // TODO: implement this
        function feature() {}
      `,
      errors: [
        {
          messageId: "todo-no-issue",
        },
      ],
    },
    {
      code: `
        // TODO: fix this later
        function fixLater() {}
      `,
      errors: [
        {
          messageId: "todo-no-issue",
        },
      ],
    },
    {
      code: `
        // TODO: add new feature
        function newFeature() {}
      `,
      errors: [
        {
          messageId: "todo-no-issue",
        },
      ],
    },
    {
      code: `
        // TODO: refactor this
        function refactoring() {}
      `,
      errors: [
        {
          messageId: "todo-no-issue",
        },
      ],
    },
    {
      code: `
        // TODO: remove this
        function remove() {}
      `,
      errors: [
        {
          messageId: "todo-no-issue",
        },
      ],
    },
  ],
});
