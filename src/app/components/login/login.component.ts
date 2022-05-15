import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.forma.valid) {
      this.loginService.login(this.forma.value).subscribe(_ => {

      })
    }
  }

}
