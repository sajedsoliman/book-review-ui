import create from "zustand";

import store from "../globalStore";

const useStoreState = create((set) => ({
	bookList: null,
	setBookList: (bookList) =>
		set({
			bookList,
		}),
	user: store.userData ? store.userData : null,
	setUser: (user) =>
		set({
			user,
		}),
}));

export default useStoreState;
