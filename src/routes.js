import About from "./About.jsx";
import Book from "./book/Book.jsx";
import BookEdit from "./book/BookEdit.jsx";
import BookList from "./book/BookList.jsx";
import BookForm from "./book/BookForm.jsx";

const routes = [
	{ path: "/edit/:id", component: BookEdit },
	{ path: "/books/:id", component: Book },
	{ path: "/books", component: BookList },
	{ path: "/add-book", component: BookForm },
	{ path: "/about", component: About },
];

export default routes;
