module.exports = {
  root: true,
  rules: {
    'comma-dangle': [2, 'always-multiline'],
    'curly': [2, 'all'],
    'eqeqeq': [2, 'allow-null'],
    'indent': [2, 2, {'SwitchCase': 1}],
    'keyword-spacing': [2, {'before': true, 'after': true, 'overrides': {}}],
    'no-console': 2,
    'no-redeclare': [2, {'builtinGlobals': true}],
    'no-undef': 2,
    'no-undef-init': 2,
    'no-undefined': 2,
    'quotes': [2, 'single'],
    'semi': [2, 'always'],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, {'anonymous': 'always', 'named': 'never'}],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': ['error', {'int32Hint': false}],
  },
  env: {
    'es6': true,
    'browser': true,
  },
  globals: {
    'd3': false,
  },
};
