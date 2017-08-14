import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {} from 'Jasmine';

import { CartaoCreditoComponent } from './cartao-credito.component';
import { CompraCartao } from "./compra-cartao";
import { FormsModule } from "@angular/forms";
import { AngularFireDatabase } from "angularfire2/database";

describe('CartaoCreditoComponent', () => {
  let component: CartaoCreditoComponent;
  let fixture: ComponentFixture<CartaoCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaoCreditoComponent ],
      imports: [ FormsModule, AngularFireDatabase ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaoCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
