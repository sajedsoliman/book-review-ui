// imports
import dotenv from "dotenv";
import proxy from "http-proxy-middleware";
import express from "express";
import SourceMapSupport from "source-map-support";
import render from "./render.jsx";

const app = express();

SourceMapSupport.install();
dotenv.config();

// HMR
const enableHMR = (process.env.ENABLE_HMR || "true") == "true";
if (enableHMR && process.env.NODE_ENV !== "production") {
	const webpack = require("webpack");
	const webpackDevMiddleware = require("webpack-dev-middleware");
	const webpackHOTMiddleware = require("webpack-hot-middleware");
	const webpackConfig = require("../webpack.config")[0];

	webpackConfig.entry.app.push("webpack-hot-middleware/client");
	webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
	const compiler = webpack(webpackConfig);
	app.use(webpackDevMiddleware(compiler));
	app.use(webpackHOTMiddleware(compiler));
}

// middleware
app.use(express.static("dist"));

// proxy middleware
const proxyTarget = process.env.PROXY_TARGET;
if (proxyTarget) {
	app.use("/graphql", proxy({ target: proxyTarget, changeOrigin: true }));
	app.use("/auth", proxy({ target: proxyTarget, changeOrigin: true }));
}

app.get("/env.js", (req, res) => {
	const env = {
		API_ENDPOINT: process.env.API_ENDPOINT,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		API_AUTH_ENDPOINT: process.env.API_AUTH_ENDPOINT,
	};
	res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.get("*", (req, res, next) => {
	render(req, res, next);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

if (module.hot) {
	module.hot.accept("./render.jsx");
}
