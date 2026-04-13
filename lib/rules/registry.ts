export const RULE_REGISTRY = [
  { id: "no-obvious-comments", name: "noObviousComments" },
  { id: "no-hedging-comments", name: "noHedgingComments" },
  { id: "no-step-comments", name: "noStepComments" },
  { id: "no-section-dividers", name: "noSectionDividers" },
  { id: "no-stub-functions", name: "noStubFunctions" },
  { id: "no-narrator-comments", name: "noNarratorComments" },
  { id: "no-ts-any", name: "noTsAny" },

  { id: "no-hardcoded-secrets", name: "noHardcodedSecrets" },
  { id: "no-inner-html", name: "noInnerHtml" },

  { id: "no-empty-catch", name: "noEmptyCatch" },
  { id: "no-console-error-only", name: "noConsoleErrorOnly" },

  { id: "no-todo", name: "noTodo" },
  { id: "no-god-function", name: "noGodFunction" },

  { id: "no-error-info-leak", name: "noErrorInfoLeak" },

  { id: "no-hallucinated-imports", name: "noHallucinatedImports" },
  { id: "no-hallucinated-react-imports", name: "noHallucinatedReactImports" },
  { id: "no-hallucinated-next-imports", name: "noHallucinatedNextImports" },

  { id: "no-redundant-comments", name: "noRedundantComments" },
  { id: "no-assumption-comments", name: "noAssumptionComments" },
  { id: "no-overconfident-comments", name: "noOverconfidentComments" },
  { id: "no-iife-wrapper", name: "noIifeWrapper" },
  { id: "no-magic-css", name: "noMagicCss" },

  // These React hooks rules are provided by eslint-plugin-react/hooks instead.
  // Users can enable them via reactConfig which requires eslint-plugin-react and eslint-plugin-react-hooks.

  { id: "no-skipped-tests", name: "noSkippedTests" },

  { id: "no-eslint-disable", name: "noEslintDisable" },

  { id: "no-dead-code-patterns", name: "noDeadCodePatterns" },
  {
    id: "no-deprecated-without-replacement",
    name: "noDeprecatedWithoutReplacement",
  },
  { id: "no-debug-assertions", name: "noDebugAssertions" },

  { id: "no-boilerplate-wrappers", name: "noBoilerplateWrappers" },
  { id: "no-reexport-shims", name: "noReexportShims" },

  { id: "no-placeholder-data", name: "noPlaceholderData" },
  { id: "no-generic-error-messages", name: "noGenericErrorMessages" },
  { id: "no-todo-without-issue", name: "noTodoWithoutIssue" },

  { id: "no-fallback-defaults", name: "noFallbackDefaults" },

  { id: "no-legacy-markers", name: "noLegacyMarkers" },
  { id: "no-fallback-patterns", name: "noFallbackPatterns" },
  { id: "no-noop-patterns", name: "noNoopPatterns" },

  { id: "no-type-aliases", name: "noTypeAliases" },
  { id: "no-import-aliases", name: "noImportAliases" },
] as const;
