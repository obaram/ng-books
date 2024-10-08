import {Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Store} from "@ngrx/store";
import {Book} from "../../types/book";
import {getAllBooks} from "../../state/actions";
import {Observable} from "rxjs";
import {selectBooks} from "../../state/books.selectors";
import {BooksListComponent} from "../../components/books-list/books-list.component";
import {AppState} from "../../types/app-state";
import {AsyncPipe} from "@angular/common";


@Component({
  standalone: true,
  selector: 'app-books-container',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, BooksListComponent, AsyncPipe],
  templateUrl: './books-view.html',
})
export class BooksViewComponent {
  books$: Observable<Book[]> = this.store.select(selectBooks);
  constructor(private store: Store<AppState>) {
  }

  public ngOnInit(){
    this.store.dispatch(getAllBooks());
  }

}
