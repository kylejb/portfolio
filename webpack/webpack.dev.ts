import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin} from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
// import { merge } from 'webpack-merge';

// import commonConfig from './webpack.common';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const devConfig: Configuration = {
    mode: "development",
    context: __dirname,
    target: 'web',
    entry: "./src/index.tsx",
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        hot: true,
        open: true,
        port: 4000,
        static: path.join(__dirname, "build"),
        watchFiles: {
            paths: ['./src/**'],
            options: {
                usePolling: true,
            }
        }
    },

    // Where files should be sent once they are bundled
    output: {
        path: path.resolve('./build'),
        filename: '[name]-[contenthash].js',
        publicPath: "/"
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
                        loader: '@typescript-eslint/parser',
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
                                    template: "./public/index.html",
                                }),
                                // new HotModuleReplacementPlugin(),
                                // new ForkTsCheckerWebpackPlugin({
                                //     async: false
                                // }),
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
};

export default devConfig;
