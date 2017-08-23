import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { AuthService } from "./services/auth.service";
import { Observable } from "rxjs/Observable";
import { By } from "@angular/platform-browser";
import { ComponentFixture } from "@angular/core/testing";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let comp: AppComponent

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AppComponent ],
      providers: [ { provide: AuthService, useClass: AuthServiceMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(comp).toBeTruthy();
  }));

  it('should show signin if the user is not logged in', () => {
      spyOn(AuthServiceMock.prototype, 'getUser').and.returnValue(Observable.of(null))
      fixture.detectChanges();

      const htmlEl: HTMLElement = fixture.debugElement.query(By.css('.navbar-right a')).nativeElement;
      expect(htmlEl).toBeDefined();
      expect(htmlEl.textContent).toContain('Entrar')
  })

  it('should show signout if the user is logged in', () => {
    spyOn(AuthServiceMock.prototype, 'getUser').and.returnValue(Observable.of(true))
    
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.debugElement.componentInstance;
    fixture.detectChanges();
      
    const htmlEl: HTMLElement = fixture.debugElement.query(By.css('.navbar-right a')).nativeElement;
    expect(htmlEl).toBeDefined();
    expect(htmlEl.textContent).toContain('Sair')
  })
});

export class AuthServiceMock {
  getUser() { return Observable.of(null) }
}
