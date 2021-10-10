import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import routes from "../routes";
import store from "../globalStore";
import useStoreState from "../store/store.js";

function BookApp() {
	const { setUser, user } = useStoreState((state) => state);
	// const [user, setUser] = useState(store.userData ? store.userData : null);

	async function getCurrentUser() {
		const apiAuthEndpoint = window.ENV.API_AUTH_ENDPOINT;
		const res = await fetch(`${apiAuthEndpoint}/user`, {
			method: "POST",
		});
		const result = await res.json();
		const { signedIn, name } = result;

		setUser({
			isSignedIn: signedIn,
			name,
		});
	}

	useEffect(() => {
		if (user == null) return getCurrentUser();
		delete store.userData;
	}, []);

	return (
		<div className="wrapper">
			<Switch>
				<Redirect from="/" to="/books" exact />
				{routes.map((route) => (
					<Route
						key={route.path}
						path={route.path}
						component={route.component}
					/>
				))}
			</Switch>
		</div>
	);
}

export default BookApp;
