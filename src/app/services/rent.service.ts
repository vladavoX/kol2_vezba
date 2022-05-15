import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rent } from '../models/rent';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private client: HttpClient) { }

  getRents() {
    return this.client.get('http://localhost:3000/rents');
  }

  getOne(id: number) {
    return this.client.get(`http://localhost:3000/rents/${id}`);
  }

  create(rent: Rent) {
    return this.client.post('http://localhost:3000/rents', rent);
  }

  update(id: number, rent: Rent) {
    return this.client.put(`http://localhost:3000/rents/${id}`, rent);
  }

  delete(id: number) {
    return this.client.delete(`http://localhost:3000/rents/${id}`);
  }
}
