module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/parser',
    'prettier/@typescript-eslint', // add this line
    'plugin:prettier/recommended', // add this line
  ],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    rules: {},
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
}