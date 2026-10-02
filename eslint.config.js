import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: [".claude/", ".tox/", ".venv/", "build/", "dist/", "journal/"] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    rules: {
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", caughtErrors: "none" }],
    },
  },
  {
    // loaded with a plain <script>, outside the module graph
    files: ["src/cra/app/web/static/js/theme-boot.js", "src/cra/app/web/static/js/pipeline-map.js"],
    languageOptions: { sourceType: "script" },
  },
  {
    files: ["eslint.config.js"],
    languageOptions: { globals: globals.node },
  },
];
