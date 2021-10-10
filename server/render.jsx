import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter as Router, matchPath } from "react-router-dom";

import Navbar from "../src/Navbar.jsx";
import BookApp from "../src/book/BookApp.jsx";

import routes from "../src/routes.js";
import store from "../src/globalStore.js";
import htmlTemplate from "./htmlTemplate.js";
import fetch from "isomorphic-fetch";

async function render(req, res) {
	const activeRoute = routes.find((route) => matchPath(req.path, route));
	let apiInitialData;

	if (activeRoute && activeRoute.component.fetchData) {
		const searchIndex = req.url.indexOf("?");
		const search = searchIndex === -1 ? null : req.url.substr(searchIndex);
		apiInitialData = await activeRoute.component.fetchData(
			matchPath(req.url, activeRoute),
			search
		);
	}

	const apiUserRes = await fetch(`${process.env.API_AUTH_ENDPOINT}/user`, {
		method: "POST",
		headers: {
			Cookie: req.headers.cookie,
		},
	});
	const userData = JSON.parse(await apiUserRes.text());

	store.initialData = apiInitialData;
	store.userData = userData;

	const context = {};
	const element = (
		<Router context={context} location={req.url}>
			<main className="app">
				<Navbar />
				<BookApp />
			</main>
		</Router>
	);

	const body = ReactDOMServer.renderToString(element);

	if (context.url) {
		res.redirect(301, context.url);
	} else {
		res.send(htmlTemplate(body, apiInitialData, userData));
	}
}

export default render;
