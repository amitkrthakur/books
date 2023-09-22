import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorDetails, Book } from './model';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { v4 as uuid } from 'uuid';

const API_URL = 'https://s3.amazonaws.com/api-fun/books.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  authorData$ = this.getData();
  books$ = new BehaviorSubject<Book[]>([]);
  books: Book[] = [];

  constructor(private http: HttpClient) { }

  // INFO Get data from the given API endpoint
  getData() {
    return this.http.get<{ data: AuthorDetails; status: string; }>(API_URL)
      .pipe(
        map(({ data }) => {
          // Attach a unique ID to each book
          const books = data.books.map(book => { return { ...book, id: uuid() } })
          return { ...data, books }
        }),
        // locally store books
        tap(x => { this.books = x.books; this.books$.next(this.books) }),
        catchError(err => {
          alert('Unable to get data..!');
          return throwError(() => err);
        })
      )
  }

  sortByTitle() {
    // INFO Using inbuild string method to sort by title alphabetically
    this.books$.next(this.books.sort((a, b) => a.title.localeCompare(b.title)))
  }

  sortByPublishDate() {
    // INFO Using array sort method to sort by publish yaer
    this.books$.next(this.books.sort((a, b) => Number(a.PublishDate) - Number(b.PublishDate)));
  }

  addBook(data: Book) {
    const book = { ...data, id: uuid() } // Creating new book object from data received and attaching a unique id to it
    this.books = [...this.books, book]
    this.books$.next(this.books); // emit updated data in subject
  }

  updateBook(book: Book) {
    const index = this.books.findIndex(x => x.id === book.id);
    this.books[index] = { ...book }; // Update selected book at the given index
    this.books$.next(this.books);
  }

  deleteBook(id: string) {
    this.books = this.books.filter(x => x.id !== id); // removing selected book to be deleted
    this.books$.next(this.books);
  }
}
