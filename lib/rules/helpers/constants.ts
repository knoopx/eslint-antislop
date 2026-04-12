/**
 * Next.js page-level exports that shouldn't be imported
 */
export const NEXT_PAGE_EXPORTS = new Set([
  "getServerSideProps",
  "getStaticProps",
  "getStaticPaths",
]);

/**
 * React APIs that AI hallucinates exist in 'react' but don't
 */
export const HALLUCINATED_REACT_APIS = new Set([
  "useRouter",
  "useParams",
  "useSearchParams",
  "Link",
  "Image",
  "Script",
]);

/**
 * Common hallucinated JS/TS packages that don't exist on npm
 */
export const HALLUCINATED_JS_PACKAGES = [
  "react-hooks",
  "react-native-webview",
  "lodash-es",
  "axios-minified",
  "express-async-handler",
  "next-seo-plugin",
  "typescript-utilities",
  "eslint-config-prettier-standard",
  "jest-extended-matchers",
  "react-query-devtools",
];
