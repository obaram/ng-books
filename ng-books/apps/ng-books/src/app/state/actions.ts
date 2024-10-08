import {createAction, props} from '@ngrx/store';
import {Book} from "../types/book";

export const getAllBooks = createAction('[Books] Get books');
export const getAllBooksSuccess = createAction('[Books] Books Success', props<{payload: Book[]}>())
export const getBook = createAction('[Books] Get book', props<{bookId: number}>());
export const getBookSuccess = createAction('[Books] Get Book Success', props<{book: Book}>())
export const createBook = createAction('[Books] Create book');
export const updateBook = createAction('[Books] Update book');
export const deleteBook = createAction('[Books] Delete book');
