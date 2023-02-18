const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const getFileName = require("./getFileName");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function () {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: getFileName("css"),
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "../public/index.html"),
    //       to: path.resolve("dist"),
    //     },
    //   ],
    // }),
    new HtmlWebpackPlugin({
      template: "../public/index.html",
    }),
    new CleanWebpackPlugin(),
  ];

  return plugins;
};
