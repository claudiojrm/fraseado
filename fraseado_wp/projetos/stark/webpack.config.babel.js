// import node modules
import path from 'path';

// import config do projeto
import config from './config';

// plugins
import Clean from 'clean-webpack-plugin';
import Manifest from 'webpack-manifest-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default {
    entry : './core/loader.webpack.js',
    mode : 'production',
    output : {
        path : path.resolve(__dirname, config.bundle),
        filename : '[name].[contenthash].js',
        publicPath : config.dist
    },
    module : {
        rules : [
            {
                test : /\.jsx?$/,
                exclude : /(node_modules)/,
                use : ['babel-loader']
            },
            {
                test : /\.s?css$/,
                exclude: [/node_modules/],
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve : {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules']
    },
    optimization : {
        minimizer : [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks : {
            chunks : 'all'
        }
    },
    plugins : [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new Clean([config.bundle], { watch : true }),
        new Manifest(),
        new GenerateSW({
            clientsClaim : true,
            skipWaiting : true,
            runtimeCaching : [
                {
                    urlPattern : /.*/,
                    handler : 'networkFirst'
                }
            ]
        })
    ]
};