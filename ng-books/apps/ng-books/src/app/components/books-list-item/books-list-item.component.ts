import {Component,  Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Book} from "../../types/book";
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {deleteBook, navigateToEditView} from "../../state/actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../types/app-state";

@Component({
  standalone: true,
  selector: 'app-books-list-item',
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    MatCardActions,
    MatButton],
  templateUrl: './books-list-item.component.html',
  styleUrls: ['./books-list-item.component.scss']
})
export class BooksListItemComponent {
  @Input() book!: Book;

  constructor(private store: Store<AppState>) {}

  public onEditClick(): void {
      this.store.dispatch(navigateToEditView({ bookId: this.book.id }));
  }

  public onDeleteClick(): void {
      this.store.dispatch(deleteBook({ bookId: this.book.id }));
  }
}
