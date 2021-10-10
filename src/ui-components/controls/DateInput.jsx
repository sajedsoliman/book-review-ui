import React, { useEffect, useState } from "react";

function stringify(date) {
	return date == null ? "" : date.toISOString().slice(0, 10);
}

function dateify(str) {
	return new Date(str) == "Invalid Date" ? null : new Date(str);
}

const DateInput = ({ date, onChange, onValidityChange, ...otherProps }) => {
	const [value, setValue] = useState(stringify(date));
	const [valid, setValid] = useState(true);
	const [focused, setFocused] = useState(false);

	useEffect(() => {
		if (!focused && valid) setValue(stringify(date));
	}, [date]);

	const handleInputChange = (e) => {
		const inputValue = e.target.value;

		if (inputValue.match(/^[\d-/]*$/)) setValue(inputValue);
	};

	const handleBlur = (e) => {
		const dateValue = dateify(value);
		const isValid = dateValue !== null || value === "";

		if (onValidityChange && valid !== isValid) {
			onValidityChange(e, isValid);
		}

		setFocused(false);
		setValid(isValid);

		if (isValid) {
			onChange(e, dateValue);
		}
	};

	const handleFocus = () => {
		setFocused(true);
	};

	const className = !focused && !valid ? "text-red-600" : null;

	return (
		<input
			type="text"
			value={value}
			onChange={handleInputChange}
			onBlur={handleBlur}
			onFocus={handleFocus}
			className={className}
			{...otherProps}
		/>
	);
};

export default DateInput;
