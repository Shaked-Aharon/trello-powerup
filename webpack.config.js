const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.ts',
        'card-fields': './src/card-fields.ts',
        templates: './src/templates.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        extensionAlias: {                   // Added this section
            '.ts': ['.js', '.ts'],
            '.tsx': ['.js', '.tsx']
        }
    },
    output: {
        filename: '[name].bundle.js',  // Changed from [name].js to ensure .js extension
        path: path.resolve(__dirname, 'docs'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './src/card-fields.html',
            filename: 'card-fields.html',
            chunks: ['card-fields']
        }),
        new HtmlWebpackPlugin({
            template: './src/templates.html',
            filename: 'templates.html',
            chunks: ['templates']
        }),
        new CopyPlugin({
            patterns: [
                { from: "assets", to: "assets", globOptions: { ignore: ['**/*.ts']} }
            ],
        }),
    ],
    optimization: {
        runtimeChunk: false,  // Add this to prevent runtime chunks
        minimize: true,       // Enable minification
        splitChunks: {       // Disable code splitting
            chunks: 'async'
        }
    }
};