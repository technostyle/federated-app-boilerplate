const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "consumer/src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "consumer/dist"),
  },
  module: {
    rules: [
      {
        test: /bootstrap\.js$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-react"]],
        },
      },
    ],
  },
  mode: "production",
  devServer: {
    contentBase: path.join(__dirname, "consumer/dist"),
    port: 3001,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  devtool: "inline-source-map",
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      library: { type: "var", name: "app1" },
      filename: "remoteEntry.js",
      remotes: {
        appVTBch: "appVTBch",
      },
      shared: {
        react: {
          eager: true,
          singleton: true,
          requiredVersion: "17.0.0",
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: "17.0.0",
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "consumer/src/index.html"),
    }),
  ],
};
