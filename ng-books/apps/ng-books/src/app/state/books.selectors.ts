import {createSelector} from "@ngrx/store";
import {BooksState} from "./books.reducer";
import {AppState} from "../types/app-state";


export const selectBooksFeature = (state: AppState) => state.books;

export const selectBooks = createSelector(
  selectBooksFeature,
  (state: BooksState) => state.items
);

export const selectCurrentBook = createSelector(
  selectBooksFeature,
  (state: BooksState) => state.currentItem
);

export const selectFilters = createSelector(
  selectBooksFeature,
  (state: BooksState) => state.filters
);
