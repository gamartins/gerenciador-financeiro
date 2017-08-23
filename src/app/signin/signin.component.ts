import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user = { email: '', password: '' };
  
  constructor(
    private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    if(this.user.email != '' && this.user.password != '') {
      this.authService.sigInWithEmailAndPassword(this.user.email, this.user.password)
    }
  }

}
