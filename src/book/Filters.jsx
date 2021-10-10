import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// utils
import { parseSearchParams } from "../utils/function.js";
import { filterURLParams } from "../utils/info.js";

const Filters = ({ history, location }) => {
	const searchParams = parseSearchParams(location.search, filterURLParams);

	const [filters, setFilters] = useState({
		author: searchParams.author || "",
		title: searchParams.title || "",
		pagesMin: searchParams.pagesMin || "",
		pagesMax: searchParams.pagesMax || "",
	});

	const setURLQueryFilters = () => {
		setFilters({
			title: searchParams.title || "",
			author: searchParams.author || "",
			pagesMin: searchParams.pagesMin || "",
			pagesMax: searchParams.pagesMax || "",
		});
	};

	useEffect(() => {
		setURLQueryFilters();
	}, [location.search]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		const numberRegEx = /^\d*$/;
		if ((name == "pagesMin" || name == "pagesMax") && !value.match(numberRegEx))
			return;

		setFilters((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFilter = (e) => {
		e.preventDefault();

		const { author, title, pagesMax, pagesMin } = filters;
		const queryParams = new URLSearchParams();

		if (author) {
			queryParams.set("author", author);
		}
		if (title) {
			queryParams.set("title", title);
		}
		if (pagesMin) {
			queryParams.set("pagesMin", pagesMin);
		}
		if (pagesMax) {
			queryParams.set("pagesMax", pagesMax);
		}

		const queryString = queryParams.toString();
		history.push({
			search: queryString ? `?${queryString}` : null,
		});
	};

	return (
		<form className="mb-4">
			<div className="flex space-x-2">
				<div className="flex">
					<input
						type="text"
						placeholder="Author"
						name="author"
						className="p-1 rounded"
						value={filters.author}
						onChange={handleInputChange}
					/>
				</div>
				<div className="flex">
					<input
						type="text"
						placeholder="Title"
						name="title"
						className="pl-1 rounded"
						value={filters.title}
						onChange={handleInputChange}
					/>
				</div>
				<div className="flex">
					<input
						type="text"
						placeholder="PagesMin"
						name="pagesMin"
						className="pl-1 rounded"
						value={filters.pagesMin}
						onChange={handleInputChange}
					/>
				</div>
				<div className="flex">
					<input
						type="text"
						placeholder="PagesMax"
						name="pagesMax"
						className="pl-1 rounded"
						value={filters.pagesMax}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<button
				type="button"
				onClick={handleFilter}
				className="bg-white px-3 text-lg border rounded mt-2"
			>
				Filter
			</button>
		</form>
	);
};

export default Filters;
