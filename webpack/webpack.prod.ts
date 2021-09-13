import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { Configuration } from "webpack";
import path from "path";
import { merge } from 'webpack-merge';

import commonConfig from './webpack.common';

const prodConfig: Configuration = merge(commonConfig, {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[contenthash].js",
        publicPath: ""
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
});

export default prodConfig;
