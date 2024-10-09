import {Component, OnInit} from '@angular/core';
import {Book} from "../../types/book";
import {BookFormComponent} from "../../components/book-form/book-form.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../types/app-state";
import {Observable} from "rxjs";
import {selectCurrentBook} from "../../state/books.selectors";
import {AsyncPipe, CommonModule} from "@angular/common";
import {getBook, updateBook} from "../../state/actions";


@Component({
  standalone: true,
  selector: 'app-book-edit',
  imports: [CommonModule, BookFormComponent, AsyncPipe],
  templateUrl: './book-edit.component.html',
})
export class BookEditComponent implements OnInit{
  book$!: Observable<Book | null>
  bookId!: number;

  onSubmit(value: Book){
    this.store.dispatch(updateBook({book: {...value, id: this.bookId}}))
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
  }

  public ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.bookId = +params.get('bookId')!;

      if (this.bookId) {
        this.store.dispatch(getBook({ bookId: this.bookId }));
      }

      this.book$ = this.store.select(selectCurrentBook)
    });
  }
}
