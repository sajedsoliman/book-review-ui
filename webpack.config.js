const path = require("path");
const webpack = require("webpack");

// to exclude node_modules from server bundle
const nodeExternals = require("webpack-node-externals");

// for all browsers
const browserConfig = {
	mode: "development",
	entry: {
		app: ["./browser/App.jsx"],
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
									targets: {
										ie: "11",
										edge: "15",
										safari: "10",
										firefox: "50",
										chrome: "49",
									},
								},
							],
							"@babel/preset-react",
						],
					},
				},
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: "postcss-loader",
					},
				],
			},
		],
	},
	optimization: {
		splitChunks: {
			name: "vendor",
			chunks: "all",
		},
	},
	resolve: {
		extensions: [".js", ".jsx", ".json", ".css"],
	},
	devtool: "source-map",
	plugins: [
		new webpack.DefinePlugin({
			__isBrowser__: "true",
		}),
	],
};

// just for node
const serverConfig = {
	mode: "development",
	target: "node",
	externals: [nodeExternals()],
	entry: {
		server: ["./server/uiserver.js"],
	},

	output: {
		filename: "server.js",
		path: path.resolve(__dirname, "public"),
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
									targets: {
										node: "14",
									},
								},
							],
							"@babel/preset-react",
						],
					},
				},
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: "postcss-loader",
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".json", ".css"],
	},
	plugins: [
		new webpack.DefinePlugin({
			__isBrowser__: "false",
		}),
	],
};

module.exports = [browserConfig, serverConfig];
