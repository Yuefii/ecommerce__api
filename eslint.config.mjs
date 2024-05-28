import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    languageOptions: { globals: globals.node }
  },
  {
    ignores: ['dist/*', 'node_modules/*', 'docs/*', 'test/*'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];