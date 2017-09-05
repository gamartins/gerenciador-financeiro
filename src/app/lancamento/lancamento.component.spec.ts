import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { LancamentoComponent } from './lancamento.component';
import { Lancamento } from "./lancamento";

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs/Subscription";

describe('LancamentoComponent', () => {
  let component: LancamentoComponent;
  let fixture: ComponentFixture<LancamentoComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancamentoComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
        { provide: FirebaseListObservable, useClass: FirebaseListObservableMock },
        { provide: AuthService, useClass: AuthServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show a table with the profits/discounts and his values', () => {
    debugElement = fixture.debugElement.query(By.css('table'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement).toBeDefined();
  });

  it('Should the table show "name", "grupo", "tipo", "opções" and "valor".', () => {
    debugElement = fixture.debugElement.query(By.css('table tr'));
    htmlElement = debugElement.nativeElement;

    expect(htmlElement.children[0].textContent).toContain('Nome');
    expect(htmlElement.children[1].textContent).toContain('Grupo');
    expect(htmlElement.children[2].textContent).toContain('Tipo');
    expect(htmlElement.children[3].textContent).toContain('Opções');
    expect(htmlElement.children[4].textContent).toContain('Valor');
  });

  it('should show a pagination for the month', () => {
    debugElement = fixture.debugElement.query(By.css('.pagination'));
    htmlElement = debugElement.nativeElement;

    expect(htmlElement).toBeDefined();
  });

  it('should the pagination elements show the months of the year', ()=> {
    debugElement = fixture.debugElement.query(By.css('.pagination'));
    htmlElement = debugElement.nativeElement;

    expect(htmlElement.children[0].textContent).toContain('Jan');
    expect(htmlElement.children[9].textContent).toContain('Out');
  });

  it('should call updateMonth() when click in the pagination months', ()=> {
    debugElement = fixture.debugElement.query(By.css('.pagination li:nth-of-type(4) a'));
    htmlElement = debugElement.nativeElement;
    let spy = spyOn(component, 'updateMonth').and.callThrough();

    htmlElement.click();
    
    expect(component.updateMonth).toHaveBeenCalledWith(3);
    expect(component.month).toBe(3);
  });

  it('should get the actual month when click getMonthName()', () => {
    const monthName = component.getMonthName();
    expect(monthName).toBe('Fev');
  });

  it('should show the books entries for a given month', () => {
    component.entries = [
      new Lancamento("Aluguel", 0, component.month, 1, 500),
      new Lancamento('Internet', 0, component.month, 1, 69.25) ];
    fixture.detectChanges();

    debugElement = fixture.debugElement.query(By.css('table tr:nth-of-type(3)'));
    htmlElement = debugElement.nativeElement;
    
    expect(htmlElement.children[0].textContent).toContain('Internet');
    expect(htmlElement.children[2].textContent).toContain('Desconto');
    expect(htmlElement.children[4].textContent).toContain('R$69.25');
  });

  it('should show ONLY the entries for a given month', () => {
    let tableRowNumber = fixture.debugElement.queryAll(By.css('table tr')).length;
    expect(tableRowNumber).toEqual(4); // Header, Footer and two Lancamento from AngularFireDatabaseMock

    component.updateMonth(2);
    fixture.detectChanges();

    tableRowNumber = fixture.debugElement.queryAll(By.css('table tr')).length;
    expect(tableRowNumber).toEqual(3); // Header, Footer and one Lancamento from AngularFireDatabaseMock
  })

  it('should show a form for add the book entries', () => {
    debugElement = fixture.debugElement.query(By.css('.add_entry'));
    htmlElement = debugElement.nativeElement;

    expect(htmlElement).toBeDefined();
  });

  it('should push added entries for the server', () => {
    component.firebaseObservable = fixture.debugElement.injector.get(FirebaseListObservable);
    const spy = spyOn(component.firebaseObservable, 'push').and.callThrough();
    const lancamento: Lancamento = new Lancamento("Internet", 0, component.month, 0, 69.00);

    component.lancamento = lancamento;
    component.onSubmit();

    expect(spy).toHaveBeenCalledWith(lancamento);
  });

  it('should show the bank balance at the end of the tablet', () => {
    component.entries = [
      new Lancamento("Aluguel", 0, component.month, 1, 500),
      new Lancamento('Internet', 0, component.month, 1, 69.25) ];
    fixture.detectChanges();

    debugElement = fixture.debugElement.query(By.css('table tr:nth-of-type(4)'));
    htmlElement = debugElement.nativeElement;
    
    expect(htmlElement.children[0].textContent).toContain('Total');
    expect(htmlElement.children[1].textContent).toContain('-R$569.25');
  })

  it('should call remove to the server when a Lancamento is deleted from the table', () => {
    component.firebaseObservable = fixture.debugElement.injector.get(FirebaseListObservable);
    const spy = spyOn(component.firebaseObservable, 'remove').and.callThrough();

    let valor1 =
    component.entries = [
      new Lancamento("Aluguel", 0, component.month, 1, 500),
      new Lancamento('Internet', 0, component.month, 1, 69.25) ];
    component.entries[0]["$key"] = '-KrhtohNG4P4M2YRT8rn'
    component.entries[1]["$key"] = '-Krhtyje3u23m8Lu10zm'
    fixture.detectChanges();
    
    debugElement = fixture.debugElement.query(By.css('.remove_entry'));
    htmlElement = debugElement.nativeElement;

    htmlElement.click();

    expect(spy).toHaveBeenCalledWith('-KrhtohNG4P4M2YRT8rn'); 
  });

  it('should create observable and subscription ', () => {
    component.firebaseObservable 
    expect(component.firebaseObservable).toBeDefined();
    expect(component.subscription).toBeDefined();
  });

  it('should show de rows ordered by "Group" column', () => {
    const items = [
      new Lancamento('Item A', 0, 0, 0, 500.00), // Group -> Alimentação
      new Lancamento('Item B', 0, 0, 0, 500.00), // Group -> Alimentação
      new Lancamento('Item C', 0, 1, 0, 500.00), // Group -> Casa
      new Lancamento('Item D', 0, 0, 0, 500.00), // Group -> Alimentação
    ]

    component.entries = items
    component.sortByGroup()
    fixture.detectChanges()

    debugElement = fixture.debugElement.query(By.css('table tr:nth-of-type(4)'))
    htmlElement = debugElement.nativeElement
    expect(htmlElement.children[1].textContent).toContain(component.groups[0])
  })

  it('should mark as active the selected month item', () => {
    component.month = 1
    fixture.detectChanges()
    htmlElement = fixture.debugElement.query(By.css('.active')).nativeElement
    expect(htmlElement.textContent).toContain('Fev')

    component.month = 2
    fixture.detectChanges()
    htmlElement = fixture.debugElement.query(By.css('.active')).nativeElement
    expect(htmlElement.textContent).toContain('Mar')
  })

  it('should update entry month when call updateMonth()', () => {
    component.updateMonth(0)
    expect(component.lancamento.month).toBe(0)

    component.updateMonth(5)
    expect(component.lancamento.month).toBe(5)
  })
});

export class AngularFireDatabaseMock {
  entries: Array<Lancamento> = [
    new Lancamento('Aluguel', 1, 0, 0, 500.00),
    new Lancamento('Internet', 1, 0, 0, 124.90),
    new Lancamento('Internet', 2, 0, 0, 124.90) ];

  list(path: string, opts?: any) {
    const query_month = opts.query.equalTo;
    const tempEntries: Array<any> = [];

    for (var index = 0; index < this.entries.length; index++) {
      let element = this.entries[index];
      if(element.month == query_month) {
        tempEntries.push(element);
      }
    }
    
    return Observable.of(tempEntries);
  }
}

export class FirebaseListObservableMock {
  public push(value: any) { }
  public update(item: string, value: Object) { }
  public remove(value: string) {}
  public subscribe() {}
}

export class AuthServiceMock { }