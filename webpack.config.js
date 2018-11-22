const path = require('path');

const PATHS = {
	scripts: path.resolve(__dirname, 'public/scripts'),
	build: path.resolve(__dirname, 'public/build'),
	styles: path.resolve(__dirname, 'public/styles')
}

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: PATHS.scripts + '/main.js',
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	module: {
		rules: [
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
				test: /\.(pug|jade)$/,
				use: [
					{
						loader: 'pug-loader'
					}
				]
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
			  	})
			}
		]
	},
	devtool: 'source-map',
	plugins: [
		new ExtractTextPlugin('styles.css')
	]
};