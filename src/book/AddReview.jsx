import React, { useState } from "react";
import { graphqlWrite } from "../api/graphQLFetch.js";

const AddReview = ({ getBook, bookId }) => {
	const [review, setReview] = useState({
		review: "",
		reviewer: "",
	});
	const [errors, setErrors] = useState(null);

	const inputChange = (e) => {
		const { value, name } = e.target;

		setReview((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const query = `
			mutation addReview($review: ReviewInputs!, $bookId: ID!) {
                reviewAdd(review: $review, bookId: $bookId) {
                    reviews {
                        reviewer
                        review
                    }
                }
            }
		`;
		const data = await graphqlWrite(query, setErrors, { review, bookId });

		if (data) {
			getBook();

			// reset review
			setReview({
				review: "",
				reviewer: "",
			});

			// reset errors
			setErrors(null);
		}
	};

	return (
		<div>
			<h2 className="text-xl mt-4 text-white">Add a Review</h2>
			<form onSubmit={handleSubmit} className="flex space-x-2 my-2">
				<div>
					<input
						type="text"
						placeholder="Reviewer"
						name="reviewer"
						value={review.reviewer}
						onChange={inputChange}
						className="p-1 h-full rounded"
					/>
				</div>
				<div>
					<input
						type="text"
						placeholder="Review"
						name="review"
						value={review.review}
						onChange={inputChange}
						className="p-1 rounded h-full"
					/>
				</div>
				<button
					type="submit"
					className="bg-white text-gray-700 py-2 px-3 rounded"
				>
					Add
				</button>
			</form>
			{errors && errors.review && (
				<h6 className="text-red-500">{errors.review}</h6>
			)}
		</div>
	);
};

export default AddReview;
