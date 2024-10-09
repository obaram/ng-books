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
  on(getAllBooksSuccess, (state, {payload}) => ({...state, items: payload})),
  on(getBookSuccess, (state, {book}) => ({...state, currentItem: book})),
  on(deleteBookSuccess, (state, { bookId }) => ({
    ...state,
    items: state.items.filter(book => book.id !== bookId)
  })),
);
