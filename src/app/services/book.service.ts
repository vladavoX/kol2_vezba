import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private client: HttpClient) { }

  getBooks() {
    return this.client.get('http://localhost:3000/books');
  }

  getOne(id: number) {
    return this.client.get(`http://localhost:3000/books/${id}`);
  }

  create(book: Book) {
    return this.client.post('http://localhost:3000/books', book);
  }

  update(id: number, book: Book) {
    return this.client.put(`http://localhost:3000/books/${id}`, book);
  }

  delete(id: number) {
    return this.client.delete(`http://localhost:3000/books/${id}`);
  }

}
