import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { LoginService } from 'src/app/services/login.service';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  display = false;
  books: any = []
  forRent: any = []
  rented: any = []

  bookForm = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, Validators.required),
    author: new FormControl(null, Validators.required),
    genre: new FormControl(null, Validators.required)
  })

  constructor(private booksService: BookService, private loginService: LoginService, private rentsService: RentService) { }

  ngOnInit(): void {
    if (this.loginService.user.roles.includes('ROLE_ADMIN')) {
      this.display = true;
    }

    this.booksService.getBooks().subscribe(res => {
      this.books = res
    })
  }

  onSubmit() {
    if (this.bookForm.value.id) {
      this.booksService.update(this.bookForm.value.id, this.bookForm.value).subscribe(res => {
        this.booksService.getBooks().subscribe(res => {
          this.books = res
        })
      })
    } else {
      this.booksService.create(this.bookForm.value).subscribe(res => {
        this.booksService.getBooks().subscribe(res => {
          this.books = res
        })
      })
    }
    this.bookForm.reset()
  }

  updateBook(i: any, b: any) {
    this.booksService.update(b.id, b).subscribe(res => {
      this.booksService.getBooks().subscribe(res => {
        this.books = res
      })
    })
    this.bookForm.setValue(b)
  }

  deleteBook(i: any, b: any) {
    this.booksService.delete(b.id).subscribe(res => {
      this.books.splice(i, 1)
    })
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  rentBook(i: any, b: any) {


    this.rentsService.create({
      id: 0,
      userId: this.loginService.user.id,
      bookId: b.id,
      rentDate: new Date(),
      returnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      state: "borrowed",
      price: 0
    }).subscribe(res => {
      this.rentsService.getRents().subscribe(res => {
        this.rented = res
      })
    })

    this.forRent.splice(i, 1)
  }

}