const path = require("path");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src/index.jsx"),
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.style$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: false,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: ["file-loader"],
      },
    ],
  },
};
