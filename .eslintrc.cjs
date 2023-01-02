module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict",
        "prettier"
    ],
    plugins: ["svelte3", "@typescript-eslint"],
    ignorePatterns: ["*.cjs"],
    overrides: [{ files: ["*.svelte"], processor: "svelte3/svelte3" }],
    settings: {
        "svelte3/typescript": true
    },
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        project: ["./projects/*/tsconfig.json"],
        impliedStrict: true
    },
    env: {
        browser: true,
        es2017: true,
        node: true
    },
    rules: {
        // in eslint recommended
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-non-null-assertion": "error",
        // in eslint strict
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/no-throw-literal": "off",
        "@typescript-eslint/unified-signatures": "off",
        "@typescript-eslint/array-type": ["error", { default: "array" }],
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        // not in eslint ruleset
        "@typescript-eslint/consistent-type-exports": "error",
        eqeqeq: [
            "error",
            "always",
            {
                null: "ignore"
            }
        ],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        yoda: ["error", "always", { onlyEquality: true }],
        camelcase: [
            "error",
            {
                properties: "always"
            }
        ],
        "semi-spacing": ["error", { before: false, after: true }],
        "semi-style": ["error", "last"],
        "space-before-blocks": ["error", "always"],
        "keyword-spacing": ["error", { before: true, after: true }],
        "key-spacing": ["error", { beforeColon: false, afterColon: true, mode: "strict" }],
        "block-spacing": ["error", "always"],
        "padded-blocks": ["error", "never"],
        "func-style": ["error", "expression"],
        "consistent-return": ["error"],
        "dot-notation": ["error"],
        "prefer-rest-params": ["error"],
        "prefer-spread": ["error"],
        "prefer-template": ["error"],
        "prefer-const": "error",
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
        "no-extra-semi": ["error"],
        "no-extra-boolean-cast": ["error"],
        "no-extend-native": ["error"],
        "no-class-assign": ["error"],
        "no-constant-binary-expression": ["error"],
        "no-unmodified-loop-condition": ["error"],
        "no-unused-private-class-members": ["error"],
        "no-use-before-define": ["error"],
        "no-trailing-spaces": ["error", { skipBlankLines: false, ignoreComments: false }],
        "no-whitespace-before-property": ["error"],
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
    }
};
