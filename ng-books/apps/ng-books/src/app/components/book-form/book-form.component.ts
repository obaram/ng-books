import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../../types/book";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";

@Component({
  standalone: true,
  selector: 'app-book-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  private _book!: Book | null | undefined;


  @Input()
  set book(value: Book | null | undefined) {
    this._book = value;
    if (this._book) {
      this.patchForm(this._book);
    }
  }

  get book(): Book | null | undefined {
    return this._book;
  }

  @Output() onSubmit = new EventEmitter<Book>();
  @Output() onCancel = new EventEmitter<Book>();

  public bookForm: FormGroup;
  public bookId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      coverImage: ['', [Validators.required]],
      publishedYear: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      summary: ['', [Validators.required, Validators.minLength(10)]],
      pages: ['', [Validators.required, Validators.min(1)]],
      publisher: ['', [Validators.required]],
      language: ['', [Validators.required]],
    });
  }


  patchForm(book: Book): void {
    this.bookForm.patchValue({
      title: book.title,
      author: book.author,
      coverImage: book.coverImage,
      publishedYear: book.publishedYear,
      genre: book.genre,
      isbn: book.isbn,
      summary: book.summary,
      pages: book.pages,
      publisher: book.publisher,
      language: book.language
    });
  }

  onSave(): void {
    if (this.bookForm.valid) {
      const updatedBook = this.bookForm.value;
      this.onSubmit.next(updatedBook);
    }
  }
}
