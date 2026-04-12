import { testRules } from "../../../lib/rules/test-utils.js";
import { createMagicCssTestCases, createRuleTester } from "../../test-helpers.js";

const valid = [
  {
    code: `
      const styles = {
        padding: '2rem',
        margin: '1rem'
      };
    `,
  },
  {
    code: `
      const styles = {
        padding: '16%',
        margin: '10%'
      };
    `,
  },
];

const invalid = createMagicCssTestCases("Magic CSS value - extract to design token or const.", "magic-css");

const ruleTester = createRuleTester();

ruleTester.run("no-magic-css", testRules.noMagicCss, {
  valid,
  invalid,
});
