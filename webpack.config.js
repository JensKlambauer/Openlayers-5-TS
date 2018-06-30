const webpack = require('webpack');
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

// const devMode = process.env.NODE_ENV !== 'production'

const root = path.resolve(__dirname);
const dist = path.join(root, "dist");

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },  
    devtool: "inline-source-map",
    entry: {
        app: path.join(root, "src", "App.ts"),
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: [
                    { loader: 'tslint-loader' },
                ],
            },
            {
                test: /\.tsx?$/,
                use: [
                    { loader: "ts-loader" },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ],
            },
            // {
            //     test: /\.(png|gif|jpg|jpeg)$/,
            //     use: [{ loader: "file-loader" }],
            // },
        ],
    },
    output: {
        path: dist,
        filename: "[name].js",
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            template: path.join(root, "src", "index.html"),
            filename: path.join(dist, "index.html")
        }),
        // new CopyWebpackPlugin([
        //     { from: "content",  to: "files" }
        // ])
    ],
    devServer: {
        contentBase: dist,
        // compress: true,
        port: 9001,
        inline: true,
        hot: true
    }
};
