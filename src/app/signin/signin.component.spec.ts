import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from "../services/auth.service";
import { By } from "@angular/platform-browser";

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninComponent ],
      imports: [ FormsModule ],
      providers: [ { provide: AuthService, useClass: AuthServiceMock } ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call sigInWithEmailAndPassword if the form is valid', () => {
    let spy = spyOn(AuthServiceMock.prototype, 'sigInWithEmailAndPassword')
    
    component.user.email = 'jose@email.com'
    component.user.password = ''
    component.login();
    expect(spy).not.toHaveBeenCalled();

    component.user.email = ''
    component.user.password = '12345'
    component.login();
    expect(spy).not.toHaveBeenCalled();

    component.user.email = 'jose@email.com'
    component.user.password = '12345'
    component.login();
    expect(spy).toHaveBeenCalled();
  })
});

export class AuthServiceMock {
  auth: { currentUser: null }
  public sigInWithEmailAndPassword() {}
}