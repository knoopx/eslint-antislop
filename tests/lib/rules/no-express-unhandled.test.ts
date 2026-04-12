import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-express-unhandled", testRules.noExpressUnhandled, {
  valid: [
    {
      code: `
        app.get("/api", async (req, res) => {
          try {
            const data = await fetchData();
            res.json(data);
          } catch (e) {
            res.status(500).json({ error: e.message });
          }
        });
      `,
    },
    {
      code: `
        app.get("/api", (req, res) => {
          res.json({ data: "sync" });
        });
      `,
    },
    {
      code: `
        router.get("/api", async (req, res, next) => {
          try {
            const data = await fetchData();
            res.json(data);
          } catch (e) {
            next(e);
          }
        });
      `,
    },
  ],
  invalid: [
    {
      code: `
        app.get("/api", async (req, res) => {
          const data = await fetchData();
          res.json(data);
        });
      `,
      errors: [
        {
          messageId: "express-unhandled",
        },
      ],
    },
    {
      code: `
        app.post("/api", async (req, res) => {
          const result = await processRequest(req.body);
          res.json(result);
        });
      `,
      errors: [
        {
          messageId: "express-unhandled",
        },
      ],
    },
    {
      code: `
        router.delete("/api/:id", async (req, res) => {
          await deleteItem(req.params.id);
          res.json({ success: true });
        });
      `,
      errors: [
        {
          messageId: "express-unhandled",
        },
      ],
    },
    {
      code: `
        app.put("/api/:id", async (req, res) => {
          const updated = await updateItem(req.params.id, req.body);
          res.json(updated);
        });
      `,
      errors: [
        {
          messageId: "express-unhandled",
        },
      ],
    },
  ],
});
