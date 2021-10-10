import React, { useEffect, useState } from "react";

// api
import { getBook, updateBook } from "../api/book.js";
import store from "../globalStore.js";
// zustand
import useStoreState from "../store/store.js";

// components
import {
	TextInput,
	NumInput,
	DateInput,
} from "../ui-components/controls/Controls.js";

const BookEdit = ({ match, history }) => {
	const { setBookList } = useStoreState((state) => state);

	const [book, setBook] = useState(
		store.initialData ? store.initialData : null
	);
	const [errors, setErrors] = useState({});

	const { id } = match.params;

	const fetchBook = async () => {
		setBook(await BookEdit.fetchData({ params: match.params }));
	};

	useEffect(() => {
		if (store.initialData === undefined) {
			fetchBook();

			return;
		}

		delete store.initialData;
	}, []);

	if (!book) return null;

	const handleInputChange = (e, naturalValue) => {
		setBook((prev) => ({
			...prev,
			[e.target.name]: naturalValue,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { reviews, ...changes } = book;
		for (const property in changes) {
			if (changes[property] == null) {
				delete changes[property];
			}
		}

		const bookList = await updateBook(id, changes, setErrors);

		if (bookList) {
			setBookList(bookList);

			setErrors({});

			history.goBack();
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex flex-col space-y-6">
				<div className="flex space-x-2">
					<div>
						<label className="block text-white">Author</label>
						<TextInput
							text={book.author}
							onChange={handleInputChange}
							name="author"
							placeholder="Author"
							className="rounded p-1"
						/>
					</div>
					<div>
						<label
							className={
								"block text-white" + (errors.title ? " text-red-600" : "")
							}
						>
							Title
						</label>
						<TextInput
							text={book.title}
							onChange={handleInputChange}
							name="title"
							placeholder="Title"
							className={
								"rounded p-1" +
								` ${errors.title ? "border border-red-600 text-red-600" : ""}`
							}
						/>
					</div>
				</div>
				<div className="flex space-x-2">
					<div>
						<label className="block text-white">Pages Count</label>
						<NumInput
							number={book.pagesCount}
							onChange={handleInputChange}
							name="pagesCount"
							placeholder="Pages Count"
							className="rounded p-1"
						/>
					</div>
					<div>
						<label className="block text-white">Published Date</label>
						<DateInput
							date={new Date(book.publishedDate)}
							onChange={handleInputChange}
							name="publishedDate"
							placeholder="Published Date"
							className="rounded p-1"
						/>
					</div>
				</div>
			</div>

			<button
				type="submit"
				className="bg-yellow-600 text-gray-800 rounded mt-3 p-1 font-semibold"
			>
				Save Changes
			</button>
		</form>
	);
};

BookEdit.fetchData = async (match) => {
	return getBook(match.params.id);
};

export default BookEdit;
