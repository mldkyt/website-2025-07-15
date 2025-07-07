// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import pluginImport from "eslint-plugin-import";
import pluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [".next/**/*.*", ".next/static/**/*.*", "dist/**/*", "build/**/*"],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: pluginPrettier,
      import: pluginImport,
      unicorn: pluginUnicorn,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        }
      }
    },
    rules: {
      "prettier/prettier": "error",
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
      "unicorn/prefer-ternary": "error",
      "unicorn/no-array-reduce": "warn",
      "unicorn/no-null": "warn",
      "import/order": [
        "error",
        {
          groups: [["builtin", "external"], ["internal"], ["parent", "sibling", "index"]],
          "newlines-between": "always",
        },
      ],
      "import/no-unresolved": "error",
      "no-console": "warn",
      "no-debugger": "error",
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
]);
