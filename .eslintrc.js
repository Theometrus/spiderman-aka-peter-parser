module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["standard-with-typescript", "prettier"],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "@typescript-eslint/strict-boolean-expressions": 0,
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
    },
    "plugins": ["jest"]
}
