import { defineConfig } from "vite";
import { readdirSync } from "fs";
import { join } from "path";

function listSourceFiles(
  dir: string,
  extraReject?: (name: string) => boolean,
): string[] {
  return readdirSync(join(__dirname, dir), { withFileTypes: true })
    .filter(
      (d) => d.isFile() && d.name.endsWith(".ts") && !extraReject?.(d.name),
    )
    .map((d) => d.name.replace(".ts", ""));
}

const rules = listSourceFiles(
  "lib/rules",
  (name) => name.includes("test-") || name === "utils.ts",
);
const helpers = listSourceFiles("lib/rules/helpers");
const utils = listSourceFiles("lib/rules/utils");

const entryPoints = [
  "index.ts",
  "configs/antislop.ts",
  "lib/plugin.ts",
  "lib/rule-wrapper.ts",
  "lib/rules/utils.ts",
  ...rules.map((name) => `lib/rules/${name}.ts`),
  ...helpers.map((name) => `lib/rules/helpers/${name}.ts`),
  ...utils.map((name) => `lib/rules/utils/${name}.ts`),
];

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: entryPoints.reduce(
        (acc, file) => {
          const key = file
            .replace(/\.ts$/, "")
            .replace("configs/", "configs/")
            .replace("lib/", "lib/");
          acc[key] = file;
          return acc;
        },
        {} as Record<string, string>,
      ),
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        /^node:/,
        /^@?typescript-eslint/,
        "esquery",
        "@es-joy/jsdoccomment",
        "eslint",
        "typescript-eslint",
        "typescript",
        "react",
        "react-hooks",
      ],
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        dir: "dist",
      },
    },
  },
});
