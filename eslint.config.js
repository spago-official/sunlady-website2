module.exports = {
  root: true,
  extends: [
    "next/core-web-api",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "no-unused-vars": "warn"
  },
  ignores: ["**/*.test.js", "**/*.test.ts"], // 無視するファイルを指定
}; 