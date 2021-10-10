import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import useStoreState from "./store/store";

const Navbar = () => {
	const [withGoogle, setWithGoogle] = useState(true);
	const [googleAuth, setGoogleAuth] = useState(null);
	const { user, setUser } = useStoreState((state) => state);
	const [userData, setUserData] = useState({
		name: "",
		email: "",
	});

	useEffect(() => {
		const clientID = window.ENV.GOOGLE_CLIENT_ID;
		if (!clientID) return;
		window.gapi.load("auth2", () => {
			if (!window.gapi.auth2.getAuthInstance()) {
				window.gapi.auth2.init({ client_id: clientID }).then((_) => {
					setGoogleAuth(window.gapi.auth2.getAuthInstance());
				});
			}
		});
	}, []);

	const handleUserDataChange = (e) => {
		setUserData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSignIn = async () => {
		let googleToken;
		// Getting the token
		try {
			const googleUser = await googleAuth.signIn();
			const token = googleUser.getAuthResponse().id_token;
			googleToken = token;
		} catch (error) {
			console.log(error.message);
		}

		// Verifying the token
		try {
			const apiAuthEndpoint = window.ENV.API_AUTH_ENDPOINT;
			const res = await fetch(`${apiAuthEndpoint}/signin`, {
				method: "POST",
				body: JSON.stringify({ google_token: googleToken }),
				headers: { "Content-Type": "application/json" },
			});
			const result = await res.json();
			const { name, signedIn } = result;

			setUser({
				isSignedIn: signedIn,
				name,
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleSignInWithEmailAndPassword = async (e) => {
		e.preventDefault();

		if (userData.name == "" || userData.email == "") return;

		try {
			const apiAuthEndpoint = window.ENV.API_AUTH_ENDPOINT;
			const res = await fetch(`${apiAuthEndpoint}/signin`, {
				method: "POST",
				body: JSON.stringify({ name: userData.name, email: userData.email }),
				headers: { "Content-Type": "application/json" },
			});
			const result = await res.json();
			const { name, email, signedIn } = result;
			console.log(result);

			setUser({
				isSignedIn: signedIn,
				name,
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleSignOut = async () => {
		const apiAuthEndpoint = window.ENV.API_AUTH_ENDPOINT;

		try {
			await fetch(`${apiAuthEndpoint}/signout`, {
				method: "POST",
			});
			await googleAuth.signOut();

			setUser({
				isSignedIn: false,
				name: "",
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<nav className="nav">
			<NavLink to="/books">All Books</NavLink>
			{" | "}
			<NavLink to="/add-book">Add Book</NavLink>
			{" | "}
			<NavLink to="/about">About</NavLink>
			{" | "}
			{user && user.isSignedIn ? (
				<div>
					<span style={{ color: "white" }}>Welcome Back, {user.name}</span>

					<button onClick={handleSignOut}>Sign Out</button>
				</div>
			) : withGoogle ? (
				<button
					disabled={googleAuth == null}
					type="button"
					onClick={handleSignIn}
					style={{
						background: "none",
						backgroundColor: "transparent",
						border: "0",
					}}
				>
					<img
						src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"
						alt="Sign In"
					/>
				</button>
			) : (
				<form onSubmit={handleSignInWithEmailAndPassword}>
					<input
						type="text"
						name="name"
						placeholder="Name"
						className="mr-2"
						value={userData.name}
						onChange={handleUserDataChange}
					/>
					<input
						type="text"
						name="email"
						placeholder="Email"
						value={userData.email}
						onChange={handleUserDataChange}
					/>
					<button type="submit">Login</button>
				</form>
			)}
		</nav>
	);
};

export default Navbar;
