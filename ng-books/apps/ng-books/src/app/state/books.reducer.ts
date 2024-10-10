import {createReducer, on} from '@ngrx/store';
import {Book} from "../types/book";
import {deleteBookSuccess, getAllBooksSuccess, getBookSuccess, setFilter} from "./actions";

export interface BooksState {
  items: Book[];
  currentItem: Book | null;
  filters: {
    [key: string]: string;
  }
}

export const initialState: BooksState = {
  items: [],
  currentItem: null,
  filters: {}
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
  on(setFilter, (state, {key, value}) => ({...state, filters: {
    ...state.filters,
    [key]: value
  }})),
);
