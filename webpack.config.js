const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const environment = process.env.NODE_ENV;
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
// const temp = require('node-stdlib-browser');

module.exports = {
	mode: environment,
	entry: {
		src: './client/index.js'
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
	},
	// externals: [
	// 	'pg-protocol',
	// 	'pg-connection-string',
	// 	'pgpass',
	// 	'split2',
	// 	'buffer',
	// 	'pg',
	// ],
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
    modules: ['client', 'node_modules'], // Assuming that your files are inside the src dir
		fallback: {
			"fs": false,
			"net": false,
			"tls": false,
			"pg-native": false,
		}
	}, 
	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
			{
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Development',
			template: 'index.html'
		}),
		new webpack.ProvidePlugin({
			process: 'process/browser',
}),
	new NodePolyfillPlugin()
	],
	devServer: {
		static: {
			publicPath: '/build',
			directory: path.resolve(__dirname, 'build')
		},
		port: 8080,
		proxy: {
			'/spice': 'http://localhost:3000/',
			'/users': 'http://localhost:3000/',
			'/graphQL': 'http://localhost:3000/',
		}
	}
}