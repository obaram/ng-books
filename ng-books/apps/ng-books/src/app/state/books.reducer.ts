import {createReducer, on} from '@ngrx/store';
import {Book} from "../types/book";
import {deleteBookSuccess, getAllBooksSuccess, getBookSuccess} from "./actions";

export interface BooksState {
  items: Book[];
  currentItem: Book | null;
}

export const initialState: BooksState = {
  items: [],
  currentItem: null
}

export const booksFeatureKey = "books";

export const booksReducer = createReducer(
  initialState,
  on(getAllBooksSuccess, (state, {books}) => ({...state, items: books})),
  on(getBookSuccess, (state, {book}) => ({...state, currentItem: book})),
  on(deleteBookSuccess, (state, { bookId }) => ({
    ...state,
    items: state.items.filter(book => book.id !== bookId)
  })),
);
