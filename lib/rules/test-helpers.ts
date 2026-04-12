/**
 * Helper functions to generate common test patterns
 */

const MAGIC_CSS_SIZES = [
  { pad: "8px", margin: "4px" },
  { pad: "4px", margin: "2px" },
  { pad: "12px", margin: "6px" },
  { pad: "16px", margin: "8px" },
  { pad: "20px", margin: "10px" },
  { pad: "24px", margin: "12px" },
  { pad: "28px", margin: "14px" },
  { pad: "32px", margin: "16px" },
  { pad: "36px", margin: "18px" },
  { pad: "40px", margin: "20px" },
];

/**
 * Create comment test cases
 */
function createCommentTestCases(
  patterns: Array<{
    comment: string;
    code: string;
    errorCount?: number;
  }>,
  errorMessage: string,
  messageId: string = "default",
): Array<{ code: string; errors: Array<{ messageId: string }> }> {
  return patterns.map(({ comment, code, errorCount = 1 }) => ({
    code: `
      // ${comment}
      ${code}
    `,
    errors: Array(errorCount).fill({ messageId }),
  }));
}

/**
 * Create narrator comment test cases
 */
export function createNarratorTestCases(errorMessage: string, messageId: string = "default"): Array<{ code: string; errors: Array<{ messageId: string }> }> {
  return createCommentTestCases(
    [
      { comment: 'Calculate the total price', code: `
        function calculateTotal(items) {
          const total = items.reduce((sum, item) => sum + item.price, 0);
          return total;
        }
      ` },
      { comment: 'Get data from the API', code: `
        async function fetchData(url) {
          const response = await fetch(url);
          return response.json();
        }
      ` },
      { comment: 'Add two numbers together', code: `
        function add(a, b) {
          return a + b;
        }
      ` },
      { comment: 'Loop through the array', code: `
        for (const item of items) {
          console.log(item);
        }
      ` },
      { comment: 'Sort the array in ascending order', code: `
        function sortArray(arr) {
          return arr.sort();
        }
      ` },
      { comment: 'Filter out invalid items', code: `
        function filterItems(items) {
          return items.filter(i => i.valid);
        }
      ` },
      { comment: 'Check if the user is authenticated', code: `
        function checkAuth(user) {
          return user !== null;
        }
      ` },
      { comment: 'Map over the results', code: `
        function mapResults(results) {
          return results.map(r => r.id);
        }
      ` },
      { comment: 'Convert to uppercase', code: `
        function toUpper(str) {
          return str.toUpperCase();
        }
      ` },
      { comment: 'Remove duplicates from array', code: `
        function removeDuplicates(arr) {
          return [...new Set(arr)];
        }
      ` },
    ],
    errorMessage,
    messageId,
  );
}

/**
 * Create placeholder data test cases
 */
export function createPlaceholderDataTestCases(errorMessage: string, messageId: string = "default"): Array<{ code: string; errors: Array<{ messageId: string }> }> {
  return createPlaceholderDataTestCasesInternal([
    { code: `
      function getUser() {
        return {
          name: 'Lorem ipsum',
          email: 'lorem ipsum'
        };
      }
    `, errorCount: 2 },
    { code: `
      const mockData = [
        { name: 'TBD' },
        { name: 'XXX' }
      ];
    `, errorCount: 2 },
    { code: `
      const config = {
        apiUrl: 'your text here'
      };
    ` },
    { code: `
      function createPost() {
        return {
          title: 'Lorem ipsum',
          content: 'TBD'
        };
      }
    `, errorCount: 2 },
    { code: `
      const testUser = {
        username: 'placeholder',
        password: 'xxx'
      };
    `, errorCount: 2 },
  ], errorMessage, messageId);
}

/**
 * Internal helper for creating placeholder data test cases
 */
function createPlaceholderDataTestCasesInternal(
  placeholderCases: Array<{ code: string; errorCount?: number }>,
  errorMessage: string,
  messageId: string = "default",
): Array<{ code: string; errors: Array<{ messageId: string }> }> {
  return placeholderCases.map(({ code, errorCount = 1 }) => ({
    code,
    errors: Array(errorCount).fill({ messageId }),
  }));
}

/**
 * Create overconfident comment test cases
 */
export function createOverconfidentCommentTestCases(errorMessage: string, messageId: string = "default"): Array<{ code: string; errors: Array<{ messageId: string }> }> {
  const patterns = [
    "Obviously this is the right way",
    "Clearly this should work",
    "Simply call this function",
    "Just pass the data here",
    "Easy to understand",
    "Trivial implementation",
    "Basically the same thing",
    "Literally the best approach",
    "Of course this works",
    "Naturally this is correct",
    "Certainly will work",
    "Sure this is fine",
  ];
  return createCommentTestCases(
    patterns.map((pattern) => ({
      comment: pattern,
      code: `function func() {}`,
    })),
    errorMessage,
    messageId,
  );
}

/**
 * Create magic CSS test cases
 */
export function createMagicCssTestCases(errorMessage: string, messageId: string = "default"): Array<{ code: string; errors: Array<{ messageId: string }> }> {
  return MAGIC_CSS_SIZES.map((s) => ({
    code: `
      const styles = {
        padding: '${s.pad}',
        margin: '${s.margin}'
      };
    `,
    errors: [{ messageId: messageId }, { messageId: messageId }],
  }));
}
