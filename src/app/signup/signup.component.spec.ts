import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ FormsModule, ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useClass: RouterMock},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthServices.signUp', () => {
    const htmlElement = fixture.debugElement.query(By.css('button')).nativeElement
    const spy = spyOn(component.authServices, 'signUp')

    htmlElement.click()
    expect(spy).toHaveBeenCalled()
  })
});

class AuthServiceMock {
  signUp(user: string, email: string) {}
}

class RouterMock {
  navigateByUrl(url: string) {}
}
