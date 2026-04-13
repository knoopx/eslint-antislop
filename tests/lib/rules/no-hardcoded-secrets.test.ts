import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-hardcoded-secrets", testRules.noHardcodedSecrets, {
  valid: [
    {
      code: `
        const apiKey = process.env.API_KEY;
      `,
    },
  ],
  invalid: [
    {
      code: `
        const apiKey = "sk-1234567890abcdefghijklmnopqrstuvwxyz";
      `,
      errors: [{ messageId: "no-hardcoded-secret" }],
    },
    {
      code: `
        const api_key = "AKIAIOSFODNN7EXAMPLE";
      `,
      errors: [{ messageId: "no-hardcoded-secret" }],
    },
    {
      code: `
        const password = "supersecret123password";
      `,
      errors: [{ messageId: "no-hardcoded-secret" }],
    },
    {
      code: `
        const token = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
      `,
      errors: [{ messageId: "no-hardcoded-secret" }],
    },
    {
      code: `
        const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
      `,
      errors: [{ messageId: "no-hardcoded-secret" }],
    },
    {
      code: `
        const accessKey = "ABCD1234EXAMPLEACCESSKEY";
      `,
      errors: [{ messageId: "no-hardcoded-secret" }],
    },
    {
      code: `
        const privateKey = "-----BEGIN RSA PRIVATE KEY-----";
      `,
      errors: [{ messageId: "no-hardcoded-secret" }],
    },
    {
      code: `
        const config = {
          apiKey: "sk-1234567890abcdefghijklmnopqrstuvwxyz",
          secret: "mysupersecretvalue123"
        };
      `,
      errors: [
        { messageId: "no-hardcoded-secret" },
        { messageId: "no-hardcoded-secret" },
      ],
    },
  ],
});
