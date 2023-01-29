const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    index: path.join(__dirname, "./src/index.js"),
  },

  output: {
    publicPath: "/",
    path: path.join(__dirname, "app"),
    filename: "app.js",
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "/app"),
    },
    port: 8001,
    hot: true,
    open: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        exclude: /images/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/fonts",
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({ filename: "css/style.css" }),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "components/button.html",
      template: "./src/components/button.html",
    }),
    new HtmlWebpackPlugin({
      filename: "components/textfield.html",
      template: "./src/components/textfield.html",
    }),
    new HtmlWebpackPlugin({
      filename: "components/card.html",
      template: "./src/components/card.html",
    }),
    new HtmlWebpackPlugin({
      filename: "components/banner.html",
      template: "./src/components/banner.html",
    }),
  ],
};
