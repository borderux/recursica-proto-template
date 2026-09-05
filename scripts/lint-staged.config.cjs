// lint-staged config for this standalone prototype template.
//
// Adapted from recursica-adapter-mantine-v8's scripts/lint-staged.config.cjs:
// same single-package shape (no monorepo/turbo routing needed), minus the
// ADAPTER_STATUS.md validation step, which doesn't apply here.
//
// .cjs, not .js: this package.json has "type": "module", so a plain .js file
// using `module.exports` here would be parsed as ESM and fail to load —
// "Failed to read config from file" from lint-staged, which then fails the
// Husky pre-commit hook outright.
module.exports = {
  // For all non-JS/TS files, just format them
  "*.{json,md,css,scss}": ["prettier --write"],

  // For JS/TS files, format, lint, and type-check the whole package
  "*.{js,jsx,ts,tsx}": () => [
    "prettier --write .",
    "eslint --fix .",
    "npm run check-types",
  ],
};
