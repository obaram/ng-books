import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {EMPTY, switchMap, tap, withLatestFrom} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {BooksService} from "../services/books.service";
import {
  createBook,
  createBookSuccess, deleteBook, deleteBookSuccess, getBooks,
  getAllBooksSuccess,
  getBookSuccess,
  navigateToCreateView,
  navigateToEditView, setFilter, updateBook, updateBookSuccess
} from "./actions";
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {AppState} from "../types/app-state";
import {selectFilters} from "./books.selectors";

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private booksService: BooksService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  getBooks$ = createEffect(() => this.actions$.pipe(
      ofType(getBooks, setFilter),
      withLatestFrom(this.store.pipe(select(selectFilters))),
      switchMap(([, filters]) => this.booksService.getBooks(filters)
        .pipe(
          map(books => getAllBooksSuccess({books: books})),
          catchError(() => EMPTY)
        ))
    )
  );

  getSingleBook$ = createEffect(() => this.actions$.pipe(
    ofType('[Books] Get book'),
    switchMap((action: { bookId: string }) =>
      this.booksService.getBookById(+action.bookId)
        .pipe(
          map(book => getBookSuccess({ book: book })),
          catchError(() => EMPTY)
        )
    )
    )
  );

  createBook$ = createEffect(() => this.actions$.pipe(
    ofType(createBook),
    switchMap((action) => this.booksService.addBook(action.book).pipe(
      map(book => createBookSuccess({ book })),
      catchError(() => EMPTY))
    )));

  updateBook$ = createEffect(() => this.actions$.pipe(
    ofType(updateBook),
    switchMap((action) => this.booksService.updateBook(action.book).pipe(
      map(book => updateBookSuccess({ book })),
      catchError((err) => {console.log(err); return EMPTY}))
    )));

  deleteBook$ = createEffect(() => this.actions$.pipe(
    ofType(deleteBook),
    switchMap((action) => this.booksService.deleteBook(action.bookId).pipe(
      map(() => deleteBookSuccess({ bookId: action.bookId })),
      catchError(()=> EMPTY))
    )));

  navigateToEdit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateToEditView),
        tap(({ bookId }) => {
          this.router.navigate(['/edit', bookId]);
        })
      ),
    { dispatch: false }
  );

  navigateToCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateToCreateView),
        tap(() => {
          this.router.navigate(['/create']);
        })
      ),
    { dispatch: false });

  navigateToMain$ = createEffect(() => this.actions$.pipe(
    ofType(updateBookSuccess, createBookSuccess),
    tap(() => {
      this.router.navigate(['/']); // Navigate to the main path
    })
  ), { dispatch: false });

}
