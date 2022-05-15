import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Token } from '../models/token';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: null | string = null;
  user: any = null

  constructor(private client: HttpClient) { }

  login(user: User) {
    return this.client.post<Token>("http://localhost:3000/login", user).pipe(
      tap(token => {
        this.token = token.token;
        this.user = JSON.parse(atob(token.token.split('.')[1]))
      })
    )
  }

  validateRoles(roles: any, method = "any") {
    if (this.user) {
      let userRoles = new Set(this.user.roles);
      roles = new Set(roles);
      let intersection = new Set();

      for (let role of roles) {
        if (userRoles.has(role)) {
          intersection.add(role);
        }
      }

      if (method === "any") {
        return intersection.size > 0;
      } else if (method === "all") {
        return intersection.size === roles.size;
      }
    }
    return false;
  }
}
