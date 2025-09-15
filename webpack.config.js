const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};
