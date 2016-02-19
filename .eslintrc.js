'use strict';

module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    node: true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true,
      'modules': true,
      'arrowFunctions': true,
      'blockBindings': true
    },
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      2,
      2
    ],
    'linebreak-style': [
      2,
      'unix'
    ],
    'quotes': [
      2,
      'single'
    ],
    'semi': [
      2,
      'always'
    ]
  }
};
