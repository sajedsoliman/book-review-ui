import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Filters from "./Filters";

// store
import store from "../globalStore";
import { getBooks } from "../api/book";
import useStoreState from "../store/store";

function BookList({ location, history }) {
	const { user } = useStoreState((state) => state);
	const [bookList, setBookList] = useState(
		store.initialData ? store.initialData : null
	);

	const fetchBookList = async () => {
		setBookList(await getBooks(location.search));
	};

	useEffect(() => {
		if (!store.initialData) fetchBookList();
	}, [location.search, user]);

	useEffect(() => {
		if (bookList === null) {
			fetchBookList();

			return;
		}

		delete store.initialData;
	}, []);

	if (!bookList) return null;

	const mappedBooks = bookList.map((book) => (
		<Link to={`/books/${book._id}`} key={book.title}>
			<li className="book relative">
				<h2>{book.title}</h2>
				<h5>{book.author}</h5>
				<h6>Published: {new Date(book.publishedDate).toDateString()}</h6>
				<span className="absolute right-3 text-xs text-purple-300">
					Pages Count: {book.pagesCount}
				</span>
				<img
					src="https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F12%2F00%2F05%2F05%2F910db405-6bd4-4a5d-bce7-c2e3135dc5e6%2F449070_WAntoneta_55908c_killing.png?auto=format&ch=Width%2CDPR&fm=png&w=600&h=600"
					alt="Book Cover"
					width="50"
					height="50"
				/>
			</li>
		</Link>
	));

	return (
		<div>
			<Filters history={history} location={location} />

			<ul className="book-list">{mappedBooks}</ul>
		</div>
	);
}

BookList.fetchData = async (match, search) => {
	return await getBooks(search);
};

export default BookList;
