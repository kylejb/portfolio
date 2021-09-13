import { Configuration, HotModuleReplacementPlugin } from "webpack";
import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from 'path';

const commonConfig: Configuration = {
    context: __dirname,
    target: 'web',
    entry: './assets/js/index',
    // Where files should be sent once they are bundled
    output: {
        path: path.resolve('./assets/bundles/'),
        filename: '[name]-[hash].js',
    },
    // Rules of how webpack will take our files, complie & bundle them for the browser
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                // exclude: /node_modules[\\\/]core-js[\\\/]webpack/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                [
                                    '@babel/preset-react',
                                    {
                                        runtime: 'automatic',
                                    },
                                ],
                                "@babel/preset-typescript",
                            ],
                            plugins: [
                                new HtmlWebpackPlugin({
                                    template: "src/index.html",
                                }),
                                new HotModuleReplacementPlugin(),
                                new ForkTsCheckerWebpackPlugin({
                                    async: false
                                }),
                                new ESLintPlugin({
                                    extensions: ["js", "jsx", "ts", "tsx"],
                                }),
                            ],
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
}

export default commonConfig;
