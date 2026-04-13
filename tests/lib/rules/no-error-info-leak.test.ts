import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-error-info-leak", testRules.noErrorInfoLeak, {
  valid: [
    {
      code: `
        res.status(500).json({ error: "Internal server error" });
      `,
    },
  ],
  invalid: [
    {
      code: `
        res.json(e.message);
      `,
      errors: [{ messageId: "no-error-info-leak" }],
    },
    {
      code: `
        res.json(e.stack);
      `,
      errors: [{ messageId: "no-error-info-leak" }],
    },
  ],
});
