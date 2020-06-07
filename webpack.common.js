const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const outputDir = "./dist";

module.exports = {
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        path: path.join(__dirname, outputDir),
        filename: "bundle.js",
        publicPath: "/dist/",
    },
    resolve: {
        extensions: [".js"],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ["env"] },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../",
                            hmr: process.env.NODE_ENV === "development",
                        },
                    },
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.scss/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../",
                            hmr: process.env.NODE_ENV === "development",
                        },
                    },
                    "css-loader",
                    "sass-loader",
                    "postcss-loader",
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css",
        }),
        require("autoprefixer"),
        new CopyPlugin({
            patterns: [{ from: "public" }],
        }),
    ],
};
