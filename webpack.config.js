const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	public: path.resolve(__dirname, 'public'),
	scripts: path.resolve(__dirname, 'public/scripts'),
	styles: path.resolve(__dirname, 'public/styles'),
	build: path.resolve(__dirname, 'public/build')
}

module.exports = {
	entry: PATHS.scripts + '/main.js',
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},

	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
				test: /\.(js|mjs)$/,
				use: [
					{
						loader: 'babel-loader',
						options: {presets: [['@babel/preset-env']]}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: CssExtractPlugin.loader
					},
					{
						loader: 'css-loader'
					}
				]
			},
			{
				test: /\.(pug|jade)$/,
				use: [
					{
						loader: 'pug-loader'
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader?limit=3000',
					}
				]
			},
			{
				test: /\.(ico)$/,
				loader: 'url-loader?limit=10&name=[name].[ext]',
			},
		]
	},

	plugins: [
		new CssExtractPlugin({
			filename: 'style.css'
		}),
		new ServiceWorkerWebpackPlugin({
			entry: PATHS.scripts + '/ServiceWorcker.js',
			excludes: [
				'**/.*',
				'**/*.map',
				'*.html',
			],
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'public/index.html',
			inject: false,
		}),
	],

	devtool: 'source-map'
};