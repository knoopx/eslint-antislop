import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-narrator-comments", testRules.noNarratorComments, {
  valid: [
    {
      code: `
        function calculateTotal(items) {
          const total = items.reduce((sum, item) => sum + item.price, 0);
          return total;
        }
      `,
    },
    {
      code: `
        async function fetchData(url) {
          const response = await fetch(url);
          return response.json();
        }
      `,
    },
    {
      code: `
        class Calculator {
          add(a, b) {
            return a + b;
          }
        }
      `,
    },
  ],
  invalid: [
    {
      code: `// Calculate the total price\nfunction calculateTotal(items) { const total = items.reduce((sum, item) => sum + item.price, 0); return total; }`,
      output: `function calculateTotal(items) { const total = items.reduce((sum, item) => sum + item.price, 0); return total; }`,
      errors: [{ message: /Remove narrator comments/ }],
    },
    {
      code: `// Get data from the API\nasync function fetchData(url) { const response = await fetch(url); return response.json(); }`,
      output: `async function fetchData(url) { const response = await fetch(url); return response.json(); }`,
      errors: [{ message: /Remove narrator comments/ }],
    },
    {
      code: `// Add two numbers together\nfunction add(a, b) { return a + b; }`,
      output: `function add(a, b) { return a + b; }`,
      errors: [{ message: /Remove narrator comments/ }],
    },
    {
      code: `// Loop through the array\nfor (const item of items) { console.log(item); }`,
      output: `for (const item of items) { console.log(item); }`,
      errors: [{ message: /Remove narrator comments/ }],
    },
    {
      code: `// Sort the array in ascending order\nfunction sortArray(arr) { return arr.sort(); }`,
      output: `function sortArray(arr) { return arr.sort(); }`,
      errors: [{ message: /Remove narrator comments/ }],
    },
    {
      code: `// Filter out invalid items\nfunction filterItems(items) { return items.filter(i => i.valid); }`,
      output: `function filterItems(items) { return items.filter(i => i.valid); }`,
      errors: [{ message: /Remove narrator comments/ }],
    },
    {
      code: `// Check if the user is authenticated\nfunction checkAuth(user) { return user !== null; }`,
      output: `function checkAuth(user) { return user !== null; }`,
      errors: [{ message: /Remove narrator comments/ }],
    },
    {
      code: `// Map over the results\nfunction mapResults(results) { return results.map(r => r.id); }`,
      output: `function mapResults(results) { return results.map(r => r.id); }`,
      errors: [{ message: /Remove narrator comments/ }],
    },
    {
      code: `// Convert to uppercase\nfunction toUpper(str) { return str.toUpperCase(); }`,
      output: `function toUpper(str) { return str.toUpperCase(); }`,
      errors: [{ message: /Remove narrator comments/ }],
    },
    {
      code: `// Remove duplicates from array\nfunction removeDuplicates(arr) { return [...new Set(arr)]; }`,
      output: `function removeDuplicates(arr) { return [...new Set(arr)]; }`,
      errors: [{ message: /Remove narrator comments/ }],
    },
  ],
} as unknown as Parameters<typeof ruleTester.run>[2]);
