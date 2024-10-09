import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {EMPTY,  switchMap, tap} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {BooksService} from "../services/books.service";
import {
  createBook,
  createBookSuccess, deleteBook, deleteBookSuccess, getAllBooks,
  getAllBooksSuccess,
  getBookSuccess,
  navigateToCreateView,
  navigateToEditView, updateBook, updateBookSuccess
} from "./actions";
import {Router} from "@angular/router";

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private booksService: BooksService,
  private router: Router
  ) {}

  loadBooks$ = createEffect(() => this.actions$.pipe(
      ofType(getAllBooks),
      switchMap(() => this.booksService.getBooks()
        .pipe(
          map(books => getAllBooksSuccess({payload: books})),
          catchError(() => EMPTY)
        ))
    )
  );

  loadBook$ = createEffect(() => this.actions$.pipe(
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
    { dispatch: false }
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

  navigateToMain$ = createEffect(() => this.actions$.pipe(
    ofType(updateBookSuccess, createBookSuccess),
    tap(() => {
      this.router.navigate(['/']); // Navigate to the main path
    })
  ), { dispatch: false });

}
