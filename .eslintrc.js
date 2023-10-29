module.exports = {
    root: true,
    env: {
        node: true,
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/recommended",
        "eslint:recommended",
        "@vue/typescript"
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "indent": ["error", 4, {
            "SwitchCase": 1
        }],
        "vue/html-indent": ["error", 4, {
            "alignAttributesVertically": false
        }],
        "vue/html-self-closing": "off",
        "vue/max-attributes-per-line": "off",
        "vue/name-property-casing": ["error", "kebab-case"],
        "@typescript-eslint/no-explicit-any": "off",
        "vue/no-multiple-template-root": "off",
    },
};
