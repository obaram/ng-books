import {Component} from '@angular/core';
import {Book} from "../../types/book";
import {BookFormComponent} from "../../components/book-form/book-form.component";
import { Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../types/app-state";
import {AsyncPipe, CommonModule} from "@angular/common";
import {createBook} from "../../state/actions";


@Component({
  standalone: true,
  selector: 'app-book-edit',
  imports: [CommonModule, BookFormComponent, AsyncPipe],
  templateUrl: './book-create.component.html',
})
export class BookCreateComponent {

  onSubmit(value: Book){
    this.store.dispatch(createBook({book: value}))
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  constructor(private router: Router,
              private store: Store<AppState>) {
  }
}
