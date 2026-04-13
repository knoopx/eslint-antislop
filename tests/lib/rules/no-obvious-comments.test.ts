import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-obvious-comments", testRules.noObviousComments, {
  valid: [
    {
      code: `
        // TODO: implement this later
        function add(a, b) {
          return a + b;
        }
      `,
    },
    {
      code: `
        // @ts-expect-error: This is expected
        const x: number = "string";
      `,
    },
    {
      code: `
        // This function adds two numbers
        function add(a, b) {
          return a + b;
        }
      `,
    },
    {
      code: `
        // Increment the counter variable by one
        function increment() {
          let count = 0;
          count++;
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        // Increment the counter
        function increment() {
          let count = 0;
          count++;
        }
      `,
      output: `
        function increment() {
          let count = 0;
          count++;
        }
      `,
      errors: [{ messageId: "no-obvious-comment" }],
    },
    {
      code: `
        // Return the sum
        function sum(a, b) {
          return a + b;
        }
      `,
      output: `
        function sum(a, b) {
          return a + b;
        }
      `,
      errors: [{ messageId: "no-obvious-comment" }],
    },
    {
      code: `
        // Initialize the variable
        let x = 5;
      `,
      output: `
        let x = 5;
      `,
      errors: [{ messageId: "no-obvious-comment" }],
    },
    {
      code: `
        // Get the data
        function getUser() {
          return users.find(u => u.id === id);
        }
      `,
      output: `
        function getUser() {
          return users.find(u => u.id === id);
        }
      `,
      errors: [{ messageId: "no-obvious-comment" }],
    },
    {
      code: `
        // Import the module
        import fs from "fs";
      `,
      output: `
        import fs from "fs";
      `,
      errors: [{ messageId: "no-obvious-comment" }],
    },
    {
      code: `
        // Export the function
        export default myFunction;
      `,
      output: `
        export default myFunction;
      `,
      errors: [{ messageId: "no-obvious-comment" }],
    },
    {
      code: `
        // Assign the value
        x = 10;
      `,
      output: `
        x = 10;
      `,
      errors: [{ messageId: "no-obvious-comment" }],
    },
    {
      code: `
        // Call the function
        myFunction();
      `,
      output: `
        myFunction();
      `,
      errors: [{ messageId: "no-obvious-comment" }],
    },
    {
      code: `
        // Loop the array
        for (let i = 0; i < arr.length; i++) {
          console.log(arr[i]);
        }
      `,
      output: `
        for (let i = 0; i < arr.length; i++) {
          console.log(arr[i]);
        }
      `,
      errors: [{ messageId: "no-obvious-comment" }],
    },
  ],
});
