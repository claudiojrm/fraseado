// import node modules
import path from 'path';

// import config do projeto
import config from './config';

// plugins
import Clean from 'clean-webpack-plugin';
import Manifest from 'webpack-manifest-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';

export default {
    entry : './core/loader.webpack.js',
    mode : 'production',
    output : {
        path : path.resolve(__dirname, config.dist),
        filename : '[name].[contenthash].js',
        publicPath : `/${config.dist}/`
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
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve : {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules']
    },
    optimization : {
        splitChunks : {
            chunks : 'all'
        }
    },
    plugins : [
        new Clean([config.dist], { watch : true }),
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