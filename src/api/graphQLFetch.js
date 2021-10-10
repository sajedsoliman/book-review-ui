import fetch from "isomorphic-fetch";
import store from "../globalStore";

const dateRegex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");
const USER_BAD_INPUT_CODE = "BAD_USER_INPUT";
function jsonDateReviver(key, value) {
	if (dateRegex.test(value)) return new Date(value);
	return value;
}

const apiEndpoint = __isBrowser__
	? window.ENV.API_ENDPOINT
	: "http://localhost:3000/graphql";

async function graphqlWrite(query, setErrors, variables = {}) {
	const req = await fetch(apiEndpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query, variables }),
	}).catch((err) => console.log(err.message));

	const body = await req.text();
	const { errors, data } = JSON.parse(body, jsonDateReviver);

	if (errors) {
		const error = errors[0];
		if (error.extensions.code === USER_BAD_INPUT_CODE) {
			setErrors(error.extensions.errors);
		}
	}

	return data;
}

async function graphqlRead(query, variables = {}) {
	const res = await fetch(apiEndpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query, variables }),
	}).catch((err) => console.log(err.message));
	const body = await res.text();
	const { data } = JSON.parse(body, jsonDateReviver);

	return data;
}

export { graphqlRead, graphqlWrite };
