const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { ModuleFederationPlugin } = require("webpack").container;
const { DefinePlugin } = require("webpack");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackSkipAssetsPlugin = require("html-webpack-skip-assets-plugin")
  .HtmlWebpackSkipAssetsPlugin;
const { PUBLIC_URL_MOCK, AGGREGATOR_URL_MOCK } = require("./constants.js");
const deps = require("./package.json").dependencies;

const publicPath = PUBLIC_URL_MOCK;
const remoteEntyPrefix = "remoteEntry";
const remoteEntryFileName = `${remoteEntyPrefix}__[contenthash:12]`;

const federatedAppName = "appVTBch";
module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath,
  },
  devtool: "source-map",
  mode: "production",
  plugins: [
    new DefinePlugin({
      CREDIT_HOLIDAYS_AGGREGATOR_HOST: JSON.stringify(AGGREGATOR_URL_MOCK),
    }),
    new ModuleFederationPlugin({
      name: federatedAppName,
      library: { type: "var", name: federatedAppName },
      filename: `${remoteEntryFileName}.js`,
      exposes: {
        "./CreditHolidays": "./src/widget",
      },
      shared: {
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "styled-components": {
          eager: true,
          singleton: true,
          requiredVersion: deps["styled-components"],
        },
        mobx: {
          eager: true,
          singleton: true,
          requiredVersion: deps["mobx"],
        },
        "mobx-react-lite": {
          eager: true,
          singleton: true,
          requiredVersion: deps["mobx-react-lite"],
        },
        "@openvtb/react-ui-kit": {
          eager: true,
          singleton: true,
          requiredVersion: deps["@openvtb/react-ui-kit"],
        },
        "@openvtb/admiral-icons": {
          eager: true,
          singleton: true,
          requiredVersion: deps["@openvtb/admiral-icons"],
        },
        "@vtb/ui-kit3": {
          eager: true,
          singleton: true,
          requiredVersion: deps["@vtb/ui-kit3"],
        },
      },
    }),
    new WebpackManifestPlugin({
      fileName: "asset-manifest.json",
      generate: (seed, files, entries) => {
        const manifestReducer = (files, file) => ({
          [file.name]: file.path,
          ...files,
        });
        const filesObject = files.reduce(manifestReducer, {});
        const entriesObject = files
          .filter(({ isInitial }) => isInitial)
          .reduce(manifestReducer, {});
        return {
          entrypoints: entriesObject,
          files: filesObject,
        };
      },
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new HtmlWebpackSkipAssetsPlugin({
      excludeAssets: [`${publicPath}/${remoteEntyPrefix}**.js`],
    }),
  ],
});
