/**
 * React-specific ESLint configuration for AI slop detection
 *
 * Adds React-specific rules to catch AI slop patterns like:
 * - dangerouslySetInnerHTML (XSS vector)
 * - Inline styles (magic CSS values)
 * - useEffect/useCallback with missing/empty dependencies
 * - State updates in loops
 * - Derived state from props
 *
 * NOTE: This config references eslint-plugin-react and eslint-plugin-react-hooks rules.
 * Users need to add these plugins to their ESLint config:
 *
 * ```js
 * import react from "eslint-plugin-react";
 * import reactHooks from "eslint-plugin-react-hooks";
 *
 * export default [
 *   { plugins: { react, "react-hooks": reactHooks } },
 *   antislop.configs.react,
 * ];
 * ```
 * 
 * Rules used:
 * - react/no-danger: Detects dangerouslySetInnerHTML (XSS vulnerability)
 * - react/rules-of-hooks: Enforces React hooks rules of hooks (required for exhaustive-deps)
 * - react-hooks/exhaustive-deps: Replaces removed antislop hook rules
 *
 * react-hooks/exhaustive-deps replaces:
 * - no-use-effect-derived-state: useEffect setting state from props/other state
 * - no-use-effect-empty-deps: useEffect with empty deps array
 * - no-use-callback-empty-deps: useCallback with empty deps array
 * - no-set-state-in-loop: setState calls inside loops or useEffect callbacks
 */

import type { Linter } from "eslint";
import { config as baseConfig } from "./base.js";

export const config: Linter.Config = {
  ...baseConfig,

  languageOptions: {
    ...baseConfig.languageOptions,
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    ...baseConfig.rules,

    // ==========================================================================
    // REACT-SPECIFIC PATTERNS (using eslint-plugin-react)
    // ==========================================================================

    // dangerouslySetInnerHTML is an XSS vector
    // Pattern: dangerouslySetInnerHTML={{ __html: ... }}
    // Equivalent to: antislop/no-inner-html for JSX
    "react/no-danger": "error",

    // Inline styles should be avoided
    // Pattern: style={{ ... }}
    "antislop/no-magic-css": "warn",

    // ========================================================================
    // REACT-HOOKS (replaces removed antislop hook rules)
    // ========================================================================
    //
    // react-hooks/exhaustive-deps replaces:
    // - antislop/no-use-effect-derived-state
    // - antislop/no-use-effect-empty-deps  
    // - antislop/no-use-callback-empty-deps
    // - antislop/no-set-state-in-loop (can detect setState in loops)
    //
    // It detects:
    // - Missing dependencies in useEffect/useCallback deps arrays
    // - Empty deps arrays when dependencies are used
    // - State updates from props/other state in useEffect
    // - setState calls inside useEffect/forEach loops
    //
    // Pattern: useEffect(() => { setState(data) }, [])
    //         useEffect(() => { setState(count) }, [count])
    //         useEffect(() => { array.forEach(() => setState()) }, [])
    "react-hooks/exhaustive-deps": "warn",
  },
};
