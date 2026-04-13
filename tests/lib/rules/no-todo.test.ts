import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-todo", testRules.noTodo, {
  valid: [
    {
      code: `
        function completed() {
          return true;
        }
      `,
    },
    {
      code: `
        // This is a regular comment
        const x = 5;
      `,
    },
  ],
  invalid: [
    {
      code: `
        // TODO: implement this
        function placeholder() {}
      `,
      errors: [{ message: /TODO.*comment found|TODO.*incomplete/ }],
    },
    {
      code: `
        // FIXME: this is broken
        function buggy() {}
      `,
      errors: [{ message: /FIXME.*comment found|FIXME.*incomplete/ }],
    },
    {
      code: `
        // XXX: dangerous code
        function unsafe() {}
      `,
      errors: [{ message: /XXX.*comment found|XXX.*incomplete/ }],
    },
    {
      code: `
        // HACK: workaround
        function workaround() {}
      `,
      errors: [{ message: /HACK.*comment found|HACK.*incomplete/ }],
    },
    {
      code: `
        // NOTE: important
        function important() {}
      `,
      errors: [{ message: /NOTE.*comment found|NOTE.*incomplete/ }],
    },
    {
      code: `
        // TODO: fix this later
        const x = 5;
      `,
      errors: [{ message: /TODO.*comment found|TODO.*incomplete/ }],
    },
    {
      code: `
        // TODO: implement this
        // FIXME: also fix this
        const y = 10;
      `,
      errors: [
        { message: /TODO.*comment found|TODO.*incomplete/ },
        { message: /FIXME.*comment found|FIXME.*incomplete/ },
      ],
    },
  ],
} as unknown as Parameters<typeof ruleTester.run>[2]);
