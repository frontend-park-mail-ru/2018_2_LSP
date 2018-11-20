const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	scripts: path.resolve(__dirname, 'public/scripts'),
	build: path.resolve(__dirname, 'public/build')
}

module.exports = {
	entry: PATHS.scripts + '/main.js',
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},

	// plugins: [
	// 	new HtmlWebpackPlugin({
	// 		filename: 'header.js',
	// 		template: PATHS.scripts + '/blocks/Header/header.pug',
	// 	}),
	// 	new HtmlWebpackPlugin({
	// 		filename: 'baseView.js',
	// 		template: PATHS.scripts + '/views/BaseView/baseView.pug',
	// 	}),
	// 	new HtmlWebpackPlugin({
	// 		filename: 'landingView.js',
	// 		template: PATHS.scripts + '/views/LandingView/landingView.pug',
	// 	})
	// ],

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
			}
		]
	},

	devtool: "source-map"
};