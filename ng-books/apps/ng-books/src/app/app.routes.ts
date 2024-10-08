import { Route } from '@angular/router';
import {BooksViewComponent} from "./views/books-list/books-view.component";
import {BookEditComponent} from "./views/books-edit/book-edit.component";


export const appRoutes: Route[] = [
  {path: '', component: BooksViewComponent},
  { path: 'edit/:bookId', component: BookEditComponent },
  { path: 'create', component: BookEditComponent },
];
