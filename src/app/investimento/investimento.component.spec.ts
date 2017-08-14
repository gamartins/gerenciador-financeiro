import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { InvestimentoComponent } from './investimento.component';
import { ItemPoupanca } from '../poupanca/item-poupanca';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('InvestimentoComponent', () => {

  let component: InvestimentoComponent;
  let fixture: ComponentFixture<InvestimentoComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let investimentos: Array<ItemPoupanca>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestimentoComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock},
        { provide: FirebaseListObservable, useClass: FirebaseListObservableMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestimentoComponent);
    component = fixture.componentInstance;

    // Valor de retorno do Firebase
    investimentos = [
      new ItemPoupanca('Imóveis', 'Em Paris', 100000.00),
      new ItemPoupanca('Ações', 'Em Nova York', 100000.00),
    ];

    investimentos[0].setKey('abc');
    investimentos[1].setKey('xyz');

    component.itensPoupanca = investimentos;

    fixture.detectChanges();
  });

  it('should get the list of investments', async() => {
    component.getContas();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.itensPoupanca.length).toEqual(2);
    });
  });

  it('should show the list of investments in a table', () => {
    // The table should exist
    debugElement = fixture.debugElement.query(By.css('table'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement).toBeDefined();

    // The table should show two rows with the investiments
    debugElement = fixture.debugElement.query(By.css('table tr:nth-of-type(2)'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.childElementCount).toEqual(4);

    // The table should show the investiment atributtes
    expect(htmlElement.children[0].textContent).toContain('Imóveis');
    expect(htmlElement.children[1].textContent).toContain('Em Paris');
    expect(htmlElement.children[3].textContent).toContain('R$100,000.00');
  });

  it('should show the total value of a investiment', () => {
    const valor_total = component.valorTotal();
    expect(valor_total).toBe(200000);
  });

  it('should create a new investment on the create button submit', () => {
    // Injecting the services
    component.listObservable = fixture.debugElement.injector.get(FirebaseListObservable);

    // Creating the element and adding to the list (simulate push from the server)
    const novoItem: ItemPoupanca = new ItemPoupanca('Tesouro Direto', 'IPCA-2019', 20000.00);
    component.itensPoupanca.push(novoItem);
    component.novoItem = novoItem;
    component.addConta();

    fixture.detectChanges();

    // Getting the HTML Element
    debugElement = fixture.debugElement.query(By.css('table tr:nth-of-type(4)'));
    htmlElement = debugElement.nativeElement;

    // The table should show the investiment atributtes
    expect(htmlElement.children[0].textContent).toContain('Tesouro Direto');
    expect(htmlElement.children[1].textContent).toContain('IPCA-2019');
    expect(htmlElement.children[3].textContent).toContain('R$20,000.00');
  });

  it('should add a value to a investment', () => {
    // Injecting the services
    component.listObservable = fixture.debugElement.injector.get(FirebaseListObservable);

    const item_position = 0;
    const operation_type = 0; // Deposit
    const value = 10000;

    component.operacao = [item_position, operation_type, value];
    component.operacaoEmConta();
    fixture.detectChanges();

    // Getting the HTML Element
    debugElement = fixture.debugElement.query(By.css('table tr:nth-of-type(2)'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.children[3].textContent).toContain('R$110,000.00');
  });

  it('should remove a value of a investment', () => {
    // Injecting the services
    component.listObservable = fixture.debugElement.injector.get(FirebaseListObservable);

    const item_position = 0;
    const operation_type = 1; // Refund
    const value = 10000;

    component.operacao = [item_position, operation_type, value];
    component.operacaoEmConta();
    fixture.detectChanges();

    // Getting the HTML Element
    debugElement = fixture.debugElement.query(By.css('table tr:nth-of-type(2)'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.children[3].textContent).toContain('R$90,000.00');
  });

});

export class AngularFireDatabaseMock {
  list() {
    const investimentos: Array<any> = [
                          new ItemPoupanca('Imóveis', 'Em Paris', 100000.00),
                          new ItemPoupanca('Ações', 'Em Nova York', 100000.00)];
    investimentos[0].$key = 'abc';
    investimentos[1].$key = 'xyz';

    return Observable.of(investimentos);
  }
}

export class FirebaseListObservableMock {
  push(value: any) {

  }

  update(item: string, value: Object) {

  }
}
