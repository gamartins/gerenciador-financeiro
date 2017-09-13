import { Injectable }     from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService implements CanActivate {
  public user: Observable<firebase.User>;
  public uuid;

  constructor(
    public firebaseAuth: AngularFireAuth,
    public router: Router) {
      this.user = firebaseAuth.authState
      this.user.subscribe(val => {
        this.uuid = val.uid
      })
  }

  canActivate() {
    this.isLogged() ? '' : this.router.navigateByUrl('/signin')
    return this.isLogged()
  }

  getUser() {
    return this.user
  }

  isLogged(): boolean {
    let user = this.firebaseAuth.auth.currentUser
    if (user) {
      return true
    } else {
      return false
    }
  }

  sigInWithEmailAndPassword(email: string, password: string){
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigateByUrl('/lancamentos')
    }).catch(error => {
      console.log(error);
    }); 
  }

  signUp(email: string, password: string) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  signOut(){
    this.firebaseAuth.auth.signOut().then(() => {
      this.router.navigateByUrl('/signin')
    });
  }
}