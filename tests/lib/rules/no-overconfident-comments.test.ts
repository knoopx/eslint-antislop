import { testRules } from "../../../lib/rules/test-utils.js";
import { createOverconfidentCommentTestCases, createRuleTester } from "../../test-helpers.js";

const valid = [
  {
    code: `
      // This function processes data
      function processData() {}
    `,
  },
  {
    code: `
      // Need to optimize this later
      function slowFunc() {}
    `,
  },
  {
    code: `
      // TODO: improve performance
      function optimize() {}
    `,
  },
];

const invalid = createOverconfidentCommentTestCases("Overconfident comment detected", "overconfident-comment");

const ruleTester = createRuleTester();

ruleTester.run("no-overconfident-comments", testRules.noOverconfidentComments, {
  valid,
  invalid,
});
