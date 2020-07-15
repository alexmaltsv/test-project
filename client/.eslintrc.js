module.exports = {
  "extends": [
    "react-app",
    "airbnb-typescript",
  ],
  "rules": {
    "react/jsx-max-props-per-line": [1, { "maximum": 1 }],
    "react/jsx-props-no-spreading": "off",
    "react/state-in-constructor": "off",
    "react/prop-types": "off",
    "import/no-named-as-default": "off",
    "import/prefer-default-export": "off",

    "@typescript-eslint/dot-notation": "off",

    "no-param-reassign": "off",
    "jsx-a11y/no-autofocus": "off",

    "no-restricted-imports": [
      "error",
      {
        "paths": [{
          "name": "styled-components",
          "message": "Please import from styled-components/macro."
        }],
        "patterns": [
          "!styled-components/macro"
        ]
      }
    ],
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      },
    }
  },

  "plugins": [
    "only-warn",
  ],

  "globals": {
    "window": true,
    "document": true,
  },
};
