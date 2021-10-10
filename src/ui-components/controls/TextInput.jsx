import React, { useEffect, useState } from "react";

function stringify(str) {
	return str != null ? str : "";
}
function immigrate(str) {
	return str === "" ? null : str;
}

const TextInput = ({ text, tag = "input", onChange, ...otherProps }) => {
	const [value, setValue] = useState(stringify(text));

	useEffect(() => {
		setValue(stringify(text));
	}, [text]);

	const handleInputChange = (e) => {
		const { value } = e.target;

		setValue(value);
	};

	const handleBlur = (e) => {
		onChange(e, immigrate(value));
	};

	return React.createElement(tag, {
		type: tag,
		value,
		onChange: handleInputChange,
		onBlur: handleBlur,
		...otherProps,
	});
};

export default TextInput;
