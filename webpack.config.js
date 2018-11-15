const path = require('path');

module.exports = {
	entry: {
		main: [
			path.resolve(__dirname, 'public') + '/scripts/main.js',
		],
	},
	module: {
		rules: [
			{
				test : /\.(js|jsx|mjs)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/preset-env']]
					}
				}
			},
		],
	},
};