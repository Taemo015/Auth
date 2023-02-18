const path = require("path");

const getRules = require("./config/getRules");
const getPlugins = require("./config/getPlugins");
const getFileName = require("./config/getFileName");
const getOptimization = require("./config/getOptimization");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const client = [path.resolve("src/client/client.tsx")];
// const server = [path.resolve("src/server/index.ts")];

module.exports = {
  context: path.resolve("src"),
  mode: "development",
  entry: {
    client,
  },
  output: {
    path: path.resolve("dist"),
    filename: getFileName("js", isDev),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
    alias: {
      client: path.resolve(__dirname, "src/client"),
      server: path.resolve(__dirname, "src/server"),
      shared: path.resolve(__dirname, "src/shared"),
    },
  },
  devServer: {
    port: 3000,
  },
  devtool: isDev && "source-map",
  optimization: getOptimization(isProd),
  module: { rules: getRules() },
  plugins: getPlugins(isProd),
};
