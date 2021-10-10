function parseSearchParams(search) {
	const params = {};
	const paramsIterator = new URLSearchParams(search).entries();
	for (const paramPair of paramsIterator) {
		params[paramPair[0]] = paramPair[1];
	}
	return params;
}

export { parseSearchParams };
