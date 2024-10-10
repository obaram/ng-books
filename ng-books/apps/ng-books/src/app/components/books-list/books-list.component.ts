import {Component, Input, signal} from '@angular/core';
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
import {navigateToCreateView, setFilter} from "../../state/actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../types/app-state";
import {SearchBarComponent} from "@ng-books/ui";

@Component({
  standalone: true,
  selector: 'app-books-list',
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    BooksListItemComponent,
    SearchBarComponent,
    MatButtonModule],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent {
  @Input() books: Book[] | null = [];

  constructor(private store: Store<AppState>) {}

  public onCreateClick(): void {
      this.store.dispatch(navigateToCreateView());
  }

  public onSearch(value: string): void {
    this.store.dispatch(setFilter({key: 'title', value: value}));
  }
}
