import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-sql-concat", testRules.noSqlConcat, {
  valid: [
    {
      code: `
        const query = "SELECT * FROM users";
      `,
    },
    {
      code: `
        const query = "INSERT INTO users (name) VALUES (?)";
      `,
    },
    {
      code: `
        const safe = "This is not SQL";
      `,
    },
    {
      code: `
        const query = \`SELECT * FROM users\`;
      `,
    },
  ],
  invalid: [
    {
      code: `
        const query = "SELECT * FROM users WHERE id = " + userId;
      `,
      errors: [
        {
          messageId: "sql-concat",
        },
      ],
    },
    {
      code: `
        const query = "DELETE FROM users WHERE id = " + id;
      `,
      errors: [
        {
          messageId: "sql-concat",
        },
      ],
    },
    {
      code: `
        const query = "UPDATE users SET name = '" + name + "'";
      `,
      errors: [
        {
          messageId: "sql-concat",
        },
      ],
    },
    {
      code: `
        const query = \`\SELECT * FROM users WHERE id = \${userId}\`;
      `,
      errors: [
        {
          messageId: "sql-concat",
        },
      ],
    },
    {
      code: `
        const query = \`DELETE FROM users WHERE id = \${id}\`;
      `,
      errors: [
        {
          messageId: "sql-concat",
        },
      ],
    },
    {
      code: `
        const query = \`INSERT INTO logs (message) VALUES (\${msg})\`;
      `,
      errors: [
        {
          messageId: "sql-concat",
        },
      ],
    },
    {
      code: `
        const query = "CREATE TABLE users (id INT)" + " NOT NULL";
      `,
      errors: [
        {
          messageId: "sql-concat",
        },
      ],
    },
  ],
});
