import {Component, OnInit} from '@angular/core';
import {Book} from "../../types/book";
import {BookFormComponent} from "../../components/book-form/book-form.component";
import {ActivatedRoute} from "@angular/router";
import {MemoizedSelector, Store} from "@ngrx/store";
import {AppState} from "../../types/app-state";
import {Observable} from "rxjs";
import {selectBookById, selectBooks} from "../../state/books.selectors";
import {AsyncPipe, CommonModule} from "@angular/common";
import {getBook} from "../../state/actions";


@Component({
  standalone: true,
  selector: 'app-book-edit',
  imports: [CommonModule, BookFormComponent, AsyncPipe],
  templateUrl: './book-edit.component.html',
})
export class BookEditComponent implements OnInit{
  book$!: Observable<Book | undefined>
  bookId!: number;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.bookId = +params.get('bookId')!;

      if (this.bookId) {
        this.store.dispatch(getBook({ bookId: this.bookId }));
      }
    });
  }

}
