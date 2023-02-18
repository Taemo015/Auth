const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function () {
  return [
    {
      test: /\.(html)$/,
      use: "html-loader",
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: {
              auto: /\.module\.css$/,
            },
          },
        },
        { loader: "postcss-loader", options: { sourceMap: true } },
      ],
    },
    {
      test: /\.(png|jpg|svg|gif|ico)$/,
      type: "asset/resource",
    },
    {
      test: /\.(ttf)$/,
      type: "asset/resource",
    },
    {
      test: /\.(ts|tsx|js)$/,
      exclude: /node_modules/,
      use: "babel-loader",
    },
  ];
};
