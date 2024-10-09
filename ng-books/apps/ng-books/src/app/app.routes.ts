import { Route } from '@angular/router';
import {BooksViewComponent} from "./views/books-list/books-view.component";
import {BookEditComponent} from "./views/books-edit/book-edit.component";
import {BookCreateComponent} from "./views/books-create/book-create.component";


export const appRoutes: Route[] = [
  {path: '', component: BooksViewComponent},
  { path: 'edit/:bookId', component: BookEditComponent },
  { path: 'create', component: BookCreateComponent },
];
