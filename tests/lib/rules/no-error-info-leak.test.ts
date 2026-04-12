import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-error-info-leak", testRules.noErrorInfoLeak, {
  valid: [
    {
      code: `
        res.json({ error: "Something went wrong" });
      `,
    },
    {
      code: `
        res.send({ status: "error" });
      `,
    },
    {
      code: `
        res.json({ message: "Failed to process" });
      `,
    },
    {
      code: `
        res.send("An error occurred");
      `,
    },
  ],
  invalid: [
    {
      code: `
        res.json(e.message);
      `,
      errors: [
        {
          messageId: "error-info-leak",
        },
      ],
    },
    {
      code: `
        res.json(e.stack);
      `,
      errors: [
        {
          messageId: "error-info-leak",
        },
      ],
    },
  ],
});
