import {createSelector} from "@ngrx/store";
import {BooksState} from "./books.reducer";
import {AppState} from "../types/app-state";


export const selectBooksFeature = (state: AppState) => state.books;

export const selectBooks = createSelector(
  selectBooksFeature,
  (state: BooksState) => state.items
);

export const selectBookById = (bookId: number) => createSelector(
  selectBooks,
  (books) => books.find(book => {
    return book.id === bookId})
);
