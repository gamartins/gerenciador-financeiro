import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    email: '',
    password: '',
    repeatPassword: '',
  };

  constructor(public authServices: AuthService, public router: Router) {

  }

  ngOnInit() {
  }

  signUp() {
    this.authServices.signUp(this.user.email, this.user.password)
    this.router.navigateByUrl('/signin')
  }

}
