const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const getFileName = (exp) =>
  isDev ? `[name].[hash].${exp}` : `[name]._prod_.[hash].${exp}`;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
  return config;
};
const getPlugins = () => {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: getFileName("css"),
    }),
    new HTMLWebpackPlugin(),
    new CleanWebpackPlugin(),
  ];

  return plugins;
};

const getCssLoader = (loader) => {
  const base = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    "css-loader",
  ];

  if (loader) {
    base.push("sass-loader");
  }

  return base;
};

const babelOptions = (arguments) => {
  const options = {
    presets: ["@babel/preset-env"],
    plugins: ["@babel/plugin-proposal-class-properties"],
  };

  if (arguments) {
    return {
      ...options,
      presets: options.presets.concat([...arguments]),
    };
  }
  return options;
};

const getJsLoaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: babelOptions(),
    },
  ];

  // if (isDev) {
  //   loaders.push("eslint-loader");
  // }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: ["./client/client.tsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: getFileName("js"),
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    alias: {
      client: path.resolve(__dirname, "src/client"),
      server: path.resolve(__dirname, "src/server"),
      shared: path.resolve(__dirname, "src/shared"),
    },
  },
  devServer: {
    port: 8080,
  },
  devtool: isDev && "source-map",
  optimization: optimization(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getCssLoader(),
      },
      {
        test: /\.s[ac]ss$/,
        use: getCssLoader("sass-loader"),
      },
      {
        test: /\.(png|jpg|svg|gif|ico)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(ttf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: getJsLoaders(),
      },
      {
        test: /\.(ts|tsx)$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: babelOptions([
              "@babel/preset-react",
              "@babel/preset-typescript",
            ]),
          },
        ],
      },
    ],
  },
  plugins: getPlugins(),
};
