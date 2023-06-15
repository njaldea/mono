const ts_recommended = {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "error"
};

const ts_strict = {
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-throw-literal": "off",
    "@typescript-eslint/unified-signatures": "off",
    "@typescript-eslint/array-type": ["error", { default: "array" }],
    "@typescript-eslint/consistent-type-definitions": ["off", "type"]
};

const ts_ungrouped = {
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/no-invalid-void-type": ["error", { allowAsThisParameter: true }]
};

const formatting = {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "semi-spacing": ["error", { before: false, after: true }],
    "semi-style": ["error", "last"],
    "no-trailing-spaces": ["error", { skipBlankLines: false, ignoreComments: false }],
    "no-whitespace-before-property": ["error"],
    "no-extra-semi": ["error"],
    "no-extra-parens": ["error", "functions"],
    "space-before-blocks": ["error", "always"],
    "keyword-spacing": ["error", { before: true, after: true }],
    "key-spacing": ["error", { beforeColon: false, afterColon: true, mode: "strict" }]
};

const enforcement = {
    eqeqeq: [
        "error",
        "always",
        {
            null: "ignore"
        }
    ],
    yoda: ["error", "always", { onlyEquality: true }],
    camelcase: [
        "error",
        {
            properties: "always"
        }
    ],
    "prefer-rest-params": ["error"],
    "prefer-spread": ["error"],
    "prefer-template": ["error"],
    "prefer-const": "error",
    "block-spacing": ["error", "always"],
    "padded-blocks": ["error", "never"],
    "func-style": ["error", "expression"],
    "consistent-return": ["error"],
    "dot-notation": ["error"],
    "require-yield": ["error"],
    "no-confusing-arrow": ["error"],
    "no-useless-rename": ["error"],
    "no-var": ["error"],
    "no-new": ["error"],
    "no-nested-ternary": ["error"],
    "no-multi-assign": ["error"],
    "no-lonely-if": ["error"],
    "no-loop-func": ["error"],
    "no-implicit-globals": ["error"],
    "no-floating-decimal": ["error"],
    "no-global-assign": ["error"],
    "no-extra-boolean-cast": ["error"],
    "no-extend-native": ["error"],
    "no-constant-binary-expression": ["error"],
    "no-unmodified-loop-condition": ["error"],
    "no-unused-private-class-members": ["error"],
    "no-use-before-define": ["error"],
    "no-restricted-syntax": [
        "error",
        {
            selector: "TSEnumDeclaration",
            message: "Do not use TS Enums"
        },
        {
            selector: ':matches(PropertyDefinition, MethodDefinition)[accessibility="private"]',
            message: "Use #private instead"
        }
    ]
};

module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict",
        "plugin:svelte/recommended",
        "prettier"
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        project: ["tsconfig.json"],
        extraFileExtensions: [".svelte", ".mdsvelte"],
        impliedStrict: true
    },
    env: {
        browser: true,
        es2017: true,
        node: true
    },
    ignorePatterns: ["*.cjs", "svelte.config.js"],
    overrides: [
        {
            files: ["*.svelte", "*.mdsvelte"],
            parser: "svelte-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser"
            }
        }
    ],
    rules: {
        ...ts_recommended,
        ...ts_strict,
        ...ts_ungrouped,
        ...formatting,
        ...enforcement
    }
};
