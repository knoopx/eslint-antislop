import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-hardcoded-secrets", testRules.noHardcodedSecrets, {
  valid: [
    {
      code: `
        const apiKey = process.env.API_KEY;
      `,
    },
    {
      code: `
        const apiKey = import.meta.env.API_KEY;
      `,
    },
    {
      code: `
        const apiKey = "example-key";
      `,
    },
    {
      code: `
        const apiKey = "test-key";
      `,
    },
    {
      code: `
        const apiKey = config.apiKey;
      `,
    },
    {
      code: `
        const apiKey = "xxx";
      `,
    },
    {
      code: `
        const password = "";
      `,
    },
  ],
  invalid: [
    {
      code: `
        const apiKey = "sk-1234567890abcdefghijklmnopqrstuvwxyz";
      `,
      errors: [
        {
          messageId: "hardcoded-secret",
        },
      ],
    },
    {
      code: `
        const api_key = "AKIAIOSFODNN7EXAMPLE";
      `,
      errors: [
        {
          messageId: "hardcoded-secret",
        },
      ],
    },
    {
      code: `
        const password = "supersecret123password";
      `,
      errors: [
        {
          messageId: "hardcoded-secret",
        },
      ],
    },
    {
      code: `
        const token = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
      `,
      errors: [
        {
          messageId: "hardcoded-secret",
        },
      ],
    },
    {
      code: `
        const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
      `,
      errors: [
        {
          messageId: "hardcoded-secret",
        },
      ],
    },
    {
      code: `
        const accessKey = "ABCD1234EXAMPLEACCESSKEY";
      `,
      errors: [
        {
          messageId: "hardcoded-secret",
        },
      ],
    },
    {
      code: `
        const privateKey = "-----BEGIN RSA PRIVATE KEY-----";
      `,
      errors: [
        {
          messageId: "hardcoded-secret",
        },
      ],
    },
    {
      code: `
        const config = {
          apiKey: "sk-1234567890abcdefghijklmnopqrstuvwxyz",
          secret: "mysupersecretvalue123"
        };
      `,
      errors: [
        {
          messageId: "hardcoded-secret",
        },
        {
          messageId: "hardcoded-secret",
        },
      ],
    },
  ],
});
