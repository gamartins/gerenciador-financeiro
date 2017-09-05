import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacoesFinanceirasComponent } from './aplicacoes-financeiras.component';
import { ItemPoupanca } from "../poupanca/item-poupanca";
import { Observable } from "rxjs/Observable";
import { DebugElement } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { By } from "@angular/platform-browser";

describe('AplicacoesFinanceirasComponent', () => {
  let component: AplicacoesFinanceirasComponent;
  let fixture: ComponentFixture<AplicacoesFinanceirasComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let aplicacoesFinanceiras: Array<ItemPoupanca>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicacoesFinanceirasComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock},
        { provide: FirebaseListObservable, useClass: FirebaseListObservableMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: AuthService, useClass: AuthServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicacoesFinanceirasComponent);
    component = fixture.componentInstance;

    // Valor de retorno do Firebase
    aplicacoesFinanceiras = [
      new ItemPoupanca('Imóveis', 'Em Paris', 100000.00),
      new ItemPoupanca('Ações', 'Em Nova York', 100000.00),
    ];

    aplicacoesFinanceiras[0].setKey('abc');
    aplicacoesFinanceiras[1].setKey('xyz');

    component.aplicacoesFinanceiras = aplicacoesFinanceiras;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set the name of the financial investment', async(() => {
    component.getInvestment()
    fixture.whenStable().then(() => {
      fixture.detectChanges()
      expect(component.nomeDaAplicacao).toBe('investimentos')
    })
  }))

  it('should get the list of financial investments', async() => {
    component.getInvestment();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.aplicacoesFinanceiras.length).toEqual(2);
    });
  });

  it('should show the list of financial investments in a table', () => {
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

  it('should show the total value of the financial investments', () => {
    const valor_total = component.totalValue();
    expect(valor_total).toBe(200000);
  });

  it('should create a new financial investments when click the create button', () => {
    // Injecting the services
    component.listObservable = fixture.debugElement.injector.get(FirebaseListObservable);

    // Creating the element and adding to the list (simulate push from the server)
    const novoItem: ItemPoupanca = new ItemPoupanca('Tesouro Direto', 'IPCA-2019', 20000.00);
    component.aplicacoesFinanceiras.push(novoItem);
    component.novoItem = novoItem;
    component.addInvestment();

    fixture.detectChanges();

    // Getting the HTML Element
    debugElement = fixture.debugElement.query(By.css('table tr:nth-of-type(4)'));
    htmlElement = debugElement.nativeElement;

    // The table should show the investiment atributtes
    expect(htmlElement.children[0].textContent).toContain('Tesouro Direto');
    expect(htmlElement.children[1].textContent).toContain('IPCA-2019');
    expect(htmlElement.children[3].textContent).toContain('R$20,000.00');
  });

  it('should add a value to a financial investment', () => {
    // Injecting the services
    component.listObservable = fixture.debugElement.injector.get(FirebaseListObservable);

    component.operacao.item_position = 0
    component.operacao.type = AplicacoesFinanceirasComponent.OPERACAO.DEPOSIT
    component.operacao.value = 10000

    component.operacaoEmConta();
    fixture.detectChanges();

    // Getting the HTML Element
    debugElement = fixture.debugElement.query(By.css('table tr:nth-of-type(2)'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.children[3].textContent).toContain('R$110,000.00');
  });

  it('should remove a value of a financial investment', () => {
    // Injecting the services
    component.listObservable = fixture.debugElement.injector.get(FirebaseListObservable);

    component.operacao.item_position = 0
    component.operacao.type = AplicacoesFinanceirasComponent.OPERACAO.REFUND
    component.operacao.value = 10000

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
  push(value: any) { }
  update(item: string, value: Object) { }
}

export class ActivatedRouteMock {
  data: Observable<any> = Observable.of({ tipoInvestimento: '/investimento' })
}

export class AuthServiceMock { }