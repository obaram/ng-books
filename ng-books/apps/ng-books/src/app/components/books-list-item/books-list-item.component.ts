import {Component, Input} from '@angular/core';
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

@Component({
  standalone: true,
  selector: 'app-books-list-item',
  imports: [CommonModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardImage, MatCardActions, MatButton],
  templateUrl: './books-list-item.component.html',
})
export class BooksListItemComponent {
  @Input() book: Book | null = null;
}
