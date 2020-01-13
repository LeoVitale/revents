module.exports = {
  env: {
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  rules: {
    'class-methods-use-this': 'off',
    'prettier/prettier': 'error',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-export': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      alias: [
        ['components', './src/components'],
        ['containers', './src/containers'],
        ['modules', './src/redux/modules'],
        ['config', './src/config'],
        ['utils', './src/utils'],
        ['ui', './src/components/ui'],
        ['app', './src/app'],
        ['features', './src/features'],
      ],
    },
  },
};
