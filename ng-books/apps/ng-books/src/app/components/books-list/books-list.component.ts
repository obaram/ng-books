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

@Component({
  standalone: true,
  selector: 'app-books-list',
  imports: [CommonModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardImage, BooksListItemComponent],
  templateUrl: './books-list.component.html',
})
export class BooksListComponent {
  @Input() books: Book[] | null = [];
}
