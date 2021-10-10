import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// zustand
import useStoreState from "../store/store";

// api
import { deleteBook, getBook } from "../api/book.js";

import AddReview from "./AddReview.jsx";
import store from "../globalStore";

const Book = ({ match, history }) => {
	const { setBookList } = useStoreState();
	const [book, setBook] = useState(
		store.initialData ? store.initialData : null
	);

	const id = match.params.id;

	async function fetchBook() {
		setBook(await getBook(id));
	}

	useEffect(() => {
		if (store.initialData === undefined) {
			fetchBook();

			return;
		}

		delete store.initialData;
	}, []);

	if (!book) return null;

	const handleDelete = async () => {
		const bookList = await deleteBook(id);

		if (bookList) {
			setBookList(bookList);

			history.goBack();
		}
	};

	return (
		<div className="">
			<div className="flex w-full justify-between items-center">
				<div className="flex space-x-3 mb-2 order-2">
					<Link
						to={`/edit/${id}`}
						className="bg-yellow-500 text-gray-800 font-semibold py-1 px-2 rounded"
					>
						Edit
					</Link>
					<button
						onClick={handleDelete}
						className="bg-red-600 text-gray-800 font-semibold py-1 px-2 rounded"
					>
						Delete
					</button>
				</div>

				<div className="text-white">
					<h1 className="text-3xl">{book.title}</h1>
					<h3 className="text-lg">{book.author}</h3>
					<span className="text-sm">
						{new Date(book.publishedDate).toDateString()}
					</span>
				</div>
			</div>

			{/* add review form */}
			<AddReview getBook={fetchBook} bookId={id} />

			{book.reviews.length !== 0 ? (
				<ul className="mb-4">
					{book.reviews.map(({ review, reviewer }) => (
						<li key={`${reviewer}-${review}`} className="p-2 text-white border">
							<h4 className="text-xl">{reviewer}</h4>
							<p className="text-sm">{review}</p>
						</li>
					))}
				</ul>
			) : (
				<h2 className="text-red-500">No reviews for this book</h2>
			)}
		</div>
	);
};

Book.fetchData = async (match) => {
	return getBook(match.params.id);
};

export default Book;
