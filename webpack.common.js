var HtmlWebpackPlugin = require('html-webpack-plugin');


const path = require("path");
const { NoEmitOnErrorsPlugin } = require("webpack");
module.exports = {
    mode:"development",
    devtool:"none",
    entry: {main:"./src/index.js", vendor:"./src/assets/lib/vendor.js"},
    output: {
        filename: "main.[contentHash].js",
        path: path.resolve(__dirname, "dist")
    },

    plugins: [new HtmlWebpackPlugin({
        template:"./index.html"
    })],

    module: {
      rules: [
        /* {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        }, */
        {
          test : /\.html$/,
          use:["html-loader"]
        },
        {
          test : /\.(svg|png|jpg|gif)$/,
          use:{
            loader:"file-loader",
            options:{
              name:"[name].[hash].[ext]",
              outputPath:"imgs"
            }
          }
        }
        
      ],
    },


}