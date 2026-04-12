import { sharedTodoPatterns } from "../../test-utils.js";
import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-todo", testRules.noTodo, {
  valid: sharedTodoPatterns.valid,
  invalid: sharedTodoPatterns.invalid,
});
