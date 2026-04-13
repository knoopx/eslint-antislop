import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const valid = [
  // Const declarations with as const - should be valid
  {
    code: `
      const FOCUS_STYLE = {
        background: "#a78bfa",
        border: "1px solid #7c3aed",
      } as const;
    `,
  },
  {
    code: `
      const CSS_CONSTS = {
        positionAbsolute: "absolute",
        zIndexHigh: "2147483647",
        displayNone: "none",
        fixedPosition: "fixed",
        backdropFilterBlur: "blur(4px)",
        bottom24px: "24px",
      } as const;
    `,
  },
  // Simple const declarations with CSS values - should be valid
  {
    code: `const A = "#rrggbb";`,
  },
  {
    code: `const SIZE = "16px";`,
  },
  {
    code: `const COLOR = "rgba(255, 0, 0, 0.5)";`,
  },
  {
    code: `const HSL = "hsl(120, 100%, 50%)";`,
  },
  {
    code: `const PADDING = "2rem";`,
  },
  // Non-CSS values in const - should be valid
  {
    code: `
      const styles = {
        padding: '2rem',
        margin: '1rem'
      };
    `,
  },
  // Non-CSS values with percentages
  {
    code: `
      const styles = {
        padding: '16%',
        margin: '10%'
      };
    `,
  },
  // Valid: CSS values in non-magic formats
  {
    code: `const width = 'auto';`,
  },
  {
    code: `const height = '100%';`,
  },
  {
    code: `const color = 'inherit';`,
  },
  // Variable references should NOT trigger (using CSS constants)
  {
    code: `const CSS_SPOTLIGHT_BG = "rgba(0, 0, 0, 0.5)";
             const CSS_SPOTLIGHT_BACKDROP_FILTER = "blur(4px)";
             Object.assign(style, { background: CSS_SPOTLIGHT_BG, filter: CSS_SPOTLIGHT_BACKDROP_FILTER });`,
  },
];

const invalid = [
  // let declarations should trigger
  {
    code: `let styles = { padding: '16px' };`,
    errors: [{ messageId: "magic-css" }],
  },
  {
    code: `let theme = { color: '#abcdef' };`,
    errors: [{ messageId: "magic-css" }],
  },
  {
    code: `let theme = { color: 'rgba(255, 0, 0, 0.5)' };`,
    errors: [{ messageId: "magic-css" }],
  },
  {
    code: `let theme = { color: 'hsl(120, 100%, 50%)' };`,
    errors: [{ messageId: "magic-css" }],
  },
  // var declarations should trigger
  {
    code: `var styles = { padding: '16px' };`,
    errors: [{ messageId: "magic-css" }],
  },
  // Magic CSS in nested objects
  {
    code: `const config = { theme: { color: '#abcdef' } };`,
    errors: [{ messageId: "magic-css" }],
  },
  // Magic CSS in array
  {
    code: `const colors = ['#abcdef', 'rgba(255, 0, 0, 0.5)'];`,
    errors: [{ messageId: "magic-css" }, { messageId: "magic-css" }],
  },
  // Magic CSS in object property (not in const)
  {
    code: `const obj = { padding: '16px' };`,
    errors: [{ messageId: "magic-css" }],
  },
  // Magic CSS in let with as const - should still trigger (let, not const)
  {
    code: `let styles = { padding: '16px' } as const;`,
    errors: [{ messageId: "magic-css" }],
  },
  // var with as const - should still trigger (var, not const)
  {
    code: `var styles = { padding: '16px' } as const;`,
    errors: [{ messageId: "magic-css" }],
  },
  // Magic CSS in object expression (not in const declaration)
  {
    code: `function createStyles() { return { padding: '16px' }; }`,
    errors: [{ messageId: "magic-css" }],
  },
  // Magic CSS in function argument
  {
    code: `setPadding('16px');`,
    errors: [{ messageId: "magic-css" }],
  },
  // Magic CSS in return statement
  {
    code: `return { color: '#abcdef' };`,
    errors: [{ messageId: "magic-css" }],
  },
  // Magic CSS in switch case
  {
    code: `const value = 1; switch(value) { case 1: return '24px'; }`,
    errors: [{ messageId: "magic-css" }],
  },
  // Magic CSS in ternary
  {
    code: `const x = true ? '16px' : '24px';`,
    errors: [{ messageId: "magic-css" }, { messageId: "magic-css" }],
  },
  // Magic CSS in object spread
  {
    code: `const base = { p: '16px' }; const styles = { ...base, m: '#ffffff' };`,
    errors: [{ messageId: "magic-css" }, { messageId: "magic-css" }],
  },
  // Magic CSS in array destructuring
  {
    code: `const [padding] = ['16px'];`,
    errors: [{ messageId: "magic-css" }],
  },
  // Magic CSS in class property
  {
    code: `class Styles { padding = '16px'; }`,
    errors: [{ messageId: "magic-css" }],
  },
  // Magic CSS in object method
  {
    code: `const obj = { getPadding() { return '16px'; } };`,
    errors: [{ messageId: "magic-css" }],
  },
  // Multiple CSS values in single const object (no as const)
  {
    code: `const styles = { padding: '16px', margin: '24px', color: '#abcdef' };`,
    errors: [
      { messageId: "magic-css" },
      { messageId: "magic-css" },
      { messageId: "magic-css" },
    ],
  },
  // Magic CSS in Object.assign call
  {
    code: `Object.assign(style, { padding: '16px', margin: '24px' });`,
    errors: [{ messageId: "magic-css" }, { messageId: "magic-css" }],
  },
  // Magic CSS in Object.assign with reference
  {
    code: `Object.assign(style, { color: '#ffffff' });`,
    errors: [{ messageId: "magic-css" }],
  },
  // Magic CSS in object spread assignment
  {
    code: `const style = { ...base, padding: '16px' };`,
    errors: [{ messageId: "magic-css" }],
  },
  // Magic CSS in object literal even when assigned to const variable
  {
    code: `const style = { background: "rgba(0, 0, 0, 0.5)" };`,
    errors: [{ messageId: "magic-css" }],
  },
];

const ruleTester = createRuleTester();

ruleTester.run("no-magic-css", testRules.noMagicCss, {
  valid,
  invalid,
});
