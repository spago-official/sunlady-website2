module.exports = {
  extends: [
    'next',
    'next/core-web-api'
  ],
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/no-unused-vars': 'warn'
  },
  ignorePatterns: ['node_modules/', '.next/', 'out/']
} 