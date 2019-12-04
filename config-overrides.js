// eslint-disable-next-line import/no-extraneous-dependencies
const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    components: path.resolve(__dirname, 'src/components'),
    containers: path.resolve(__dirname, 'src/containers'),
    modules: path.resolve(__dirname, 'src/redux/modules'),
    config: path.resolve(__dirname, 'src/config'),
    utils: path.resolve(__dirname, 'src/utils'),
    ui: path.resolve(__dirname, 'src/components/ui'),
  }),
);
