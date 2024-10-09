import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Book} from "../../types/book";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import { BooksListItemComponent} from "../books-list-item/books-list-item.component";
import {MatButtonModule} from "@angular/material/button";
import {navigateToCreateView} from "../../state/actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../types/app-state";

@Component({
  standalone: true,
  selector: 'app-books-list',
  imports: [CommonModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardImage, BooksListItemComponent, MatButtonModule],
  templateUrl: './books-list.component.html',
})
export class BooksListComponent {
  @Input() books: Book[] | null = [];

  constructor(private store: Store<AppState>) {}

  onCreateClick(): void {
      this.store.dispatch(navigateToCreateView());
  }
}
