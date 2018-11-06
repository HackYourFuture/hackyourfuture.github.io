module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "indent": ["error", 4, { "SwitchCase": 1 }],
    "semi": [2, "always"],
    "no-console": 1,
    "vue/max-attributes-per-line": "off",
    "prettier/prettier": ["error", { "semi": true, "tabWidth": 4 }]
  }
}
