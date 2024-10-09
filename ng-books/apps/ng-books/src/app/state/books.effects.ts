import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {EMPTY, switchMap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {BooksService} from "../services/books.service";
import {getAllBooksSuccess, getBookSuccess} from "./actions";

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private booksService: BooksService
  ) {}

  loadBooks$ = createEffect(() => this.actions$.pipe(
      ofType('[Books] Get books'),
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
}
