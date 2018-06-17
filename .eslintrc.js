const path = require('path');

module.exports = {
  root: true,
  parser: "babel-eslint",
  extends: ["airbnb-base", "eslint:recommended", "plugin:react/recommended"],
  env: {
    "browser": true,
    "node": true,
  },
  rules: {
    "no-console": "off",
    "no-alert": "off",
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve('./webpack.config.js'),
      },
    },
  },
};
