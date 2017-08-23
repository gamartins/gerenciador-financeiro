import { Component } from '@angular/core';
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged = false;
  
  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe(val => {
      if (val == null) {
        this.isLogged = false;
      } else {
        this.isLogged = true;
      }
    });
  }
}
