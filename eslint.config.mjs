import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    languageOptions: { globals: globals.node }
  },
  {
    ignores: ['build/*', 'node_modules/*', 'docs/*'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];