import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "../src/styles.css";

import BookApp from "../src/book/BookApp";
import Navbar from "../src/Navbar";

import store from "../src/globalStore.js";
store.initialData = window.__INITIAL_DATA__;
store.userData = window.__USER_DATA__;

const virtualDOMEl = (
	<Router>
		<main className="app">
			<Navbar />
			<BookApp />
		</main>
	</Router>
);

ReactDOM.hydrate(virtualDOMEl, document.getElementById("root"));

if (module.hot) {
	module.hot.accept();
}
