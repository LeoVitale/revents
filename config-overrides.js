// eslint-disable-next-line import/no-extraneous-dependencies
const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
} = require('customize-cra');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const rewireReactHotLoader = require('react-app-rewire-hot-loader-for-customize-cra');
const path = require('path');

module.exports = override(
  rewireReactHotLoader(),
  addWebpackAlias({
    components: path.resolve(__dirname, 'src/components'),
    containers: path.resolve(__dirname, 'src/containers'),
    modules: path.resolve(__dirname, 'src/redux/modules'),
    config: path.resolve(__dirname, 'src/config'),
    utils: path.resolve(__dirname, 'src/utils'),
    ui: path.resolve(__dirname, 'src/components/ui'),
    app: path.resolve(__dirname, 'src/app'),
    features: path.resolve(__dirname, 'src/features'),
  }),
  // addWebpackPlugin(new DuplicatePackageCheckerPlugin()),
  process.env.NODE_ENV === 'production' &&
    addWebpackPlugin(new BundleAnalyzerPlugin()),
);
