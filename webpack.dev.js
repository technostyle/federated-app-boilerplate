const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

// TODO: rename everywhere ?
const AGGREGATOR_HOST = process.env.AGGREGATOR_URL || "/";

module.exports = merge(common, {
  output: {
    filename: "[name].js",
  },
  devServer: {
    port: 3000,
    contentBase: "./src",
  },
  devtool: "inline-source-map",
  plugins: [
    new DefinePlugin({
      CREDIT_HOLIDAYS_AGGREGATOR_HOST: JSON.stringify(AGGREGATOR_HOST),
    }),
    new HtmlWebpackPlugin({
      chunks: ["main"],
      filename: "index.html",
      template: path.resolve(__dirname, "./index.html"),
    }),
  ],
});
