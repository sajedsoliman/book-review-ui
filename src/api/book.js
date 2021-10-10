import { graphqlRead, graphqlWrite } from "./graphQLFetch.js";
import { parseSearchParams } from "../utils/function.js";

async function getBooks(search) {
	const searchParams = parseSearchParams(search);

	const vars = {};
	if (searchParams.author) {
		vars.author = searchParams.author;
	}
	if (searchParams.title) {
		vars.title = searchParams.title;
	}
	if (searchParams.pagesMin) {
		vars.pagesMin = parseInt(searchParams.pagesMin);
	}
	if (searchParams.pagesMax) {
		vars.pagesMax = parseInt(searchParams.pagesMax);
	}

	const query = `query getBookList($author: String, $title: String, $pagesMin: Int, $pagesMax: Int) {
        bookList(author: $author, title: $title, pagesMin: $pagesMin, pagesMax: $pagesMax) {
            _id
            author
            title
            publishedDate
            pagesCount
            reviews {
                reviewer
                review
            }
        }
    }`;
	const data = await graphqlRead(query, vars);

	if (data) {
		return data.bookList;
	}
}

async function getBook(id) {
	const query = `query {
        book(id: "${id}") {
            title
            author
            pagesCount
            publishedDate
            reviews {
                reviewer
                review
            }
        }
    }`;
	const data = await graphqlRead(query);
	if (data) return data.book;
}

const addBook = async (book, setErrors) => {
	const query = `
        mutation bookAdd($book: BookInputs!) {
            bookAdd(book: $book) {
                    _id
                    author
                    title
                    publishedDate
                    pagesCount
                    reviews {
                        reviewer
                        review
                    }
            }
        }
    `;
	const data = await graphqlWrite(query, setErrors, { book });

	return data.bookAdd;
};

const updateBook = async (id, changes, setErrors) => {
	const query = `
        mutation bookUpdate($changes: BookUpdateInputs!, $id: ID!) {
            bookUpdate(changes: $changes, id: $id) {
                    _id
                    author
                    title
                    publishedDate
                    pagesCount
                    reviews {
                        reviewer
                        review
                    }
            }
        }
    `;
	const data = await graphqlWrite(query, setErrors, { id, changes });

	return data.bookUpdate;
};

const deleteBook = async (id) => {
	const query = `
        mutation bookDelete($id: ID!) {
            bookDelete(id: $id) {
                    _id
                    author
                    title
                    publishedDate
                    pagesCount
                    reviews {
                        reviewer
                        review
                    }
            }
        }
    `;
	const data = await graphqlRead(query, { id });

	return data.bookDelete;
};

export { getBooks, getBook, addBook, updateBook, deleteBook };
