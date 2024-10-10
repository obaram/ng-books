import {createAction, props} from '@ngrx/store';
import {Book} from "../types/book";


export const getAllBooks = createAction('[Books] Get books');
export const getAllBooksSuccess = createAction('[Books] Books Success', props<{books: Book[]}>())
export const getAllBooksError = createAction('[Books] Ger books error', props<{error: Error}>())

export const getBook = createAction('[Books] Get book', props<{bookId: number}>());
export const getBookSuccess = createAction('[Books] Get book success', props<{book: Book}>())
export const getBookError = createAction('[Books] Get book error', props<{error: Error}>())

export const createBook = createAction('[Books] Create book', props<{book: Book}>());
export const createBookSuccess = createAction('[Books] Create book success', props<{book: Book}>());
export const createBookError = createAction('[Books] Create book error', props<{error: Error}>());

export const updateBook = createAction('[Books] Update book', props<{book: Book}>());
export const updateBookSuccess = createAction('[Books] Update book success', props<{book: Book}>());
export const updateBookError = createAction('[Books] Update book error', props<{error: Error}>());

export const deleteBook = createAction('[Books] Delete book', props<{bookId: number}>());
export const deleteBookSuccess = createAction('[Books] Delete book success', props<{bookId: number}>());
export const deleteBookError = createAction('[Books] Delete book error', props<{error: Error}>());

export const navigateToEditView = createAction('[Books] Navigate to Edit View', props<{ bookId: number }>());
export const navigateToCreateView = createAction('[Books] Navigate to Create View');
