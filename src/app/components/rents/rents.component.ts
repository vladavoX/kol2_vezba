import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { LoginService } from 'src/app/services/login.service';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-rents',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.css']
})
export class RentsComponent implements OnInit {

  rents: any = []
  books: any = []
  display = false;

  rentForm = new FormGroup({
    id: new FormControl(null),
    userId: new FormControl(null, Validators.required),
    bookId: new FormControl(null, Validators.required),
    rentDate: new FormControl(null, Validators.required),
    returnDate: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required)
  })

  constructor(private rentsService: RentService, private loginService: LoginService, private booksService: BookService) { }

  ngOnInit(): void {
    if (this.loginService.user.roles.includes('ROLE_ADMIN')) {
      this.display = true;
    }
    this.rentsService.getRents().subscribe(res => {
      this.rents = res
    })
  }

  returnRent(i: any, r: any) {
    if (r.state === 'borrowed') {
      this.rentsService.update(r.id, {
        id: r.id,
        userId: r.userId,
        bookId: r.bookId,
        rentDate: r.rentDate,
        returnDate: r.returnDate,
        state: 'returned',
        price: r.price
      }).subscribe(res => {
        this.rentsService.getRents().subscribe(res => {
          this.rents = res
        })
      })
    }
  }

  onSubmit() {
    if (this.rentForm.value.id) {
      this.rentsService.update(this.rentForm.value.id, this.rentForm.value).subscribe(res => {
        this.rentsService.getRents().subscribe(res => {
          this.rents = res
        })
      })
    } else {
      this.rentsService.create(this.rentForm.value).subscribe(res => {
        this.rentsService.getRents().subscribe(res => {
          this.rents = res
        })
      })
    }
    this.rentForm.reset()
  }

  updateRent(i: any, r: any) {
    this.rentForm.setValue(r)
  }

  deleteRent(i: any, r: any) {
    this.rentsService.delete(r.id).subscribe(res => {
      this.rents.splice(i, 1)
    })
  }

}
