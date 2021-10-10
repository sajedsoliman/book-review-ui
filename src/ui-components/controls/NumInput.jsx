import React, { useEffect, useState } from "react";

function stringify(num) {
	return num != null ? num.toString() : "";
}
function numberify(str) {
	const parsedValue = parseInt(str);
	return Number.isNaN(parsedValue) ? null : parsedValue;
}

const NumInput = ({ number, onChange, ...otherProps }) => {
	const [value, setValue] = useState(stringify(number));

	useEffect(() => {
		setValue(stringify(number));
	}, [number]);

	const handleInputChange = (e) => {
		const { value } = e.target;
		if (value.match(/^\d*$/)) {
			setValue(value);
		}
	};

	const handleBlur = (e) => {
		onChange(e, numberify(value));
	};

	return (
		<input
			type="text"
			value={value}
			onChange={handleInputChange}
			onBlur={handleBlur}
			{...otherProps}
		/>
	);
};

export default NumInput;
