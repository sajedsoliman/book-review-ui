import React, { useEffect, useState } from "react";
import { getBooks } from "./api/book.js";

import store from "./globalStore.js";
const About = () => {
	const [bookList, setBookList] = useState((_) => {
		let list = store.initialData ? store.initialData : null;
		delete store.initialData;

		return list;
	});

	async function fetchBooks() {
		setBookList(await About.fetchData());
	}

	useEffect(() => {
		if (bookList === null) {
			fetchBooks();
		}
	}, []);

	return (
		<div className="text-white">
			<h1 className="text-3xl">The About Page</h1>
			<p>Review, Add, Suggest Books with Others</p>

			{bookList &&
				bookList.map((book) => <div key={book.title}>{book.title}</div>)}
		</div>
	);
};

About.fetchData = async function fetchData() {
	return await getBooks();
};

export default About;
