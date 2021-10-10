const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const serverConfig = require("./webpack.config.js")[1];

module.exports = webpackMerge(serverConfig, {
	entry: {
		server: ["./node_modules/webpack/hot/poll?1000"],
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
});
