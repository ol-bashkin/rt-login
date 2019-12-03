const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
module.exports = {
    entry: {
        app: "./src/index.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] },
            },
            {
                test: /\.css$/,
                use: [
                    //isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                    "postcss-loader"
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ],
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ title: "Production" }),
        new webpack.HotModuleReplacementPlugin(),
        ...(isDev
            ? []
            : [
                new MiniCssExtractPlugin({
                    filename: "[name].[contenthash].css",
                    chunkFilename: "[name].[contenthash].css",
                }),
            ]),
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/public/",
    },
};
