function htmlTemplate(body, initialData, userData) {
	return `<!DOCTYPE HTML>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Book Reviewer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
			* {
				font-family: Poppins;
				margin: 0;
			}

			ul {
				list-style-type: none;
			}

			body {
				background: #2c3e50;
				margin: 0;
			}

			.wrapper {
				max-width: 90%;
				margin: auto;
				margin-top: 50px;
			}

			.book-list {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: 20px;
			}

			.book-list a {
				text-decoration: none;
			}

			.book {
				position: relative;
				display: flex;
				flex-direction: column;
				background: linear-gradient(
					249.82deg,
					rgba(66, 62, 255, 0.83) 32.02%,
					rgba(239, 57, 255, 0.65) 112.44%
				);
				color: white;
				padding: 10px;
				border-radius: 15px;
				min-height: 160px;
				border: 1px solid rgba(239, 57, 255, 0.65);
				/* box-shadow: 0 2px 10px 0px rgba(0, 0, 0, 0.2); */
			}
			.book h2 {
				font-size: 30px;
				font-weight: bold;
			}
			.book h5 {
				font-size: 15px;
				font-weight: 500;
				text-transform: uppercase;
			}
			.book h6 {
				font-size: 14px;
				font-weight: 600;
				text-align: right;
				margin-top: auto;
			}

			.book img {
				position: absolute;
				bottom: 5px;
			}

			.book-form input {
				padding: 5px;
				width: 250px;
				font-size: 16.5px;
				border: 1px solid rgba(239, 57, 255, 0.65);
				border-radius: 5px;
				margin-bottom: 10px;
			}

			.book-form button[type="submit"] {
				padding: 5px 15px;
				color: white;
				background: rgba(239, 57, 255, 0.65);
				border-radius: 5px;
				font-size: 17px;
				font-weight: 600;
				border: 0;
				box-shadow: 0 0px 7px 0px rgba(0, 0, 0, 0.2);
				cursor: pointer;
			}

			.book-form button[type="submit"]:disabled {
				cursor: default;
				background: gray;
			}

			.review-list {
				text-align: left;
				padding: 0;
			}

			.review-list > li {
				background-color: rgb(110, 85, 255);
				padding: 5px;
				border-radius: 5px;
			}

			.review-list p {
				font-size: 14px;
			}
		</style>
		<style>
			.input-error {
				color: red;
				margin-left: 10px;
			}

			.nav {
				margin: 20px auto;
				width: 70%;
			}

			.nav a {
				color: white;
			}
			.nav a.active {
				text-decoration: underline;
				color: rgb(75 131 255);
			}
		</style>
		<!-- Poppins Font -->
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
			rel="stylesheet"
		/>
		<!-- Poppins Font End -->
  </head>
  <body>
    <!-- Page generated from template. -->
    <div id="root">${body}</div>

	<script>
		window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};
		window.__USER_DATA__ = ${JSON.stringify(userData)};
	</script>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<script src="/env.js"></script>
	<script src="/vendor.bundle.js"></script>
	<script src="/app.bundle.js"></script>
  </body>
  </html>
  `;
}

export default htmlTemplate;
