import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

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

const invalid = [
  {
    code: `// Obviously this works`,
    output: ``,
    errors: [{ message: /Delete overconfident comment/ }],
  },
  {
    code: `// Clearly the best approach`,
    output: ``,
    errors: [{ message: /Delete overconfident comment/ }],
  },
  {
    code: `// Definitely correct`,
    output: ``,
    errors: [{ message: /Delete overconfident comment/ }],
  },
  {
    code: `// Of course this will work`,
    output: ``,
    errors: [{ message: /Delete overconfident comment/ }],
  },
];

const ruleTester = createRuleTester();

ruleTester.run("no-overconfident-comments", testRules.noOverconfidentComments, {
  valid,
  invalid,
} as unknown as Parameters<typeof ruleTester.run>[2]);
