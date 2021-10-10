import React, { useState } from "react";

// api
import { addBook } from "../api/book.js";

// components
import NumInput from "../ui-components/controls/NumInput.jsx";

// store
import useStoreState from "../store/store.js";
import DateInput from "../ui-components/controls/DateInput.jsx";
import TextInput from "../ui-components/controls/TextInput.jsx";

function BookForm({}) {
	const { setBookList } = useStoreState((state) => state);

	const [book, setBook] = useState({});
	const [invalidFields, setInvalidFields] = useState({});
	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (Object.keys(invalidFields).length > 0) return;

		const books = await addBook(book, setErrors);

		if (books) {
			setBookList(books);

			setErrors({});

			// reset
			setBook({});
		}
	};

	const handleInputChange = (e, naturalValue) => {
		const name = e.target.name;

		setBook((prev) => ({
			...prev,
			[name]: naturalValue,
		}));
	};

	const onValidityChange = (e, isValid) => {
		setInvalidFields((prev) => {
			const fieldErrors = { ...prev, [e.target.name]: "Invalid Input" };
			if (isValid) {
				delete fieldErrors[e.target.name];
			}
			return fieldErrors;
		});
	};

	return (
		<div>
			<form
				className="book-form"
				onSubmit={handleSubmit}
				style={{ marginTop: 50 }}
			>
				<div>
					<TextInput
						text={book.title}
						name="title"
						placeholder="Title"
						onChange={handleInputChange}
					/>
					{errors && errors.title && (
						<span className="input-error">{errors.title}</span>
					)}
				</div>
				<div>
					<TextInput
						text={book.author}
						name="author"
						placeholder="Author"
						onChange={handleInputChange}
					/>
					{errors && errors.author && (
						<span className="input-error text-yellow-500">{errors.author}</span>
					)}
				</div>
				<div>
					<NumInput
						number={book.pagesCount}
						maxlength={3}
						name="pagesCount"
						placeholder="Pages Count"
						onChange={handleInputChange}
					/>
					{errors && errors.pagesCount && (
						<span className="input-error">{errors.pagesCount}</span>
					)}
				</div>
				<div>
					<DateInput
						date={book.publishedDate}
						onChange={handleInputChange}
						onValidityChange={onValidityChange}
						placeholder="Published Date"
						name="publishedDate"
					/>
					{invalidFields.publishedDate && (
						<span className="input-error">{invalidFields.publishedDate}</span>
					)}
				</div>

				<button type="submit" disabled={!book.title}>
					Add Book
				</button>
			</form>
		</div>
	);
}

export default BookForm;
