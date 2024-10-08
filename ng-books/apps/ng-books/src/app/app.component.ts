import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {BooksListComponent} from "./components/books-list/books-list.component";
import {BookEditComponent} from "./views/books-edit/book-edit.component";

@Component({
  standalone: true,
  imports: [RouterModule, BooksListComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-books';
}
