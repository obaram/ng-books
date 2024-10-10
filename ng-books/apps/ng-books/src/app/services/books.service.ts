import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../types/book";

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  public getBooks(filters: Record<string, string>): Observable<Book[]> {
    const searchParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        searchParams.set(`${key}_like`, filters[key]);
      }
    });

    return this.http.get<Book[]>(`${this.apiUrl}?${searchParams.toString()}`);
  }

  public getBookById(id: number): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Book>(url);
  }

  public addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  public updateBook(book: Book): Observable<Book> {
    const url = `${this.apiUrl}/${book.id}`;
    return this.http.put<Book>(url, book, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  public deleteBook(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
