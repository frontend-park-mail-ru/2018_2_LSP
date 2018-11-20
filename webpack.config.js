const path = require('path');

module.exports = {
	// entry: {
	// 	main: [
	// 		path.resolve(__dirname, 'public') + '/scripts/main.js',
	// 	],
	// },
	// module: {
	// 	rules: [
	// 		{
	// 			test : /\.(js|jsx|mjs)$/,
	// 			exclude: /node_modules/,
	// 			use: {
	// 				loader: 'babel-loader',
	// 				options: {
	// 					presets: [['@babel/preset-env']]
	// 				}
	// 			}
	// 		},
	// 	],
	// },

	entry: './public/scripts/main.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/build/'
	},

	module: {
		rules: [
			{
				test: /\.(js|mjs)$/,
				use: [
					{
						loader: 'babel-loader',
						options: {presets: ['env']}
					}
				]
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: 'pug-loader',
						options: {pretty: true}
					}
				]
			}
		]
	},

	devtool: "source-map"
};