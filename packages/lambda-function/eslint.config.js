/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    "no-console": "warn",
    "no-unused-vars": "warn",
    semi: ["error", "always"],
  },
  ignorePatterns: ["node_modules/", "dist/"], // Use ignorePatterns instead of ignores
};
