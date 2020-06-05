const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode:"production",
    output: {
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    optimization:{
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
            new HtmlWebpackPlugin({
                template: "./index.html",
                minify: {
                  removeAttributeQuotes: true,
                  collapseWhitespace: true,
                  removeComments: true
                }
              })
        ]

    },
    module: {
        rules: [
          {
            test: /\.s[ac]ss$/,
            use: [
              // Extract css into file
              MiniCssExtractPlugin.loader,
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
             'sass-loader',
            ],
          },
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({filename:"[name].[contentHash].bundle.css"}),
        new CleanWebpackPlugin()
    ]
});