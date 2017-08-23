import { Component, OnInit } from '@angular/core';
import { Lancamento } from "./lancamento";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "../services/auth.service";
import { key } from "firebase-key";

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  types = ['Provento', 'Desconto'];
  month: number = 1;
  entries: Array<Lancamento> = [];
  firebaseObservable: FirebaseListObservable<any>;
  subscription: Subscription;
  lancamento: Lancamento = new Lancamento(null, this.month, 0, null);

  constructor(public db: AngularFireDatabase, private authService: AuthService) { }

  ngOnInit() { 
    this.getEntries();
  }

  getEntries(){
    this.firebaseObservable = this.db.list('/user/' + this.authService.uuid +'/lancamentos', { 
      query: { 
        orderByChild: 'month',
        equalTo: this.month
      }
    });
    this.subscription = this.firebaseObservable.subscribe(val => {
      this.entries = [];
      val.forEach(element => {
        // let lancamento = new Lancamento(element.name, element.month, element.type, element.value, element.$key);
        let lancamento = new Lancamento(element.name, element.month, element.type, element.value);
        lancamento['$key'] = element.$key;
        this.entries.push(lancamento)
      });
    });
  }

  updateMonth(month_number: number){
    this.month = month_number;
    this.subscription.unsubscribe();
    this.getEntries();
  }

  getMonthName(): string {
    return this.months[this.month];
  }

  onSubmit() {
    this.firebaseObservable.push(this.lancamento);
    this.lancamento = new Lancamento("", this.month, 0, 0);
  }

  removeItem(index: string) {
    this.firebaseObservable.remove(index);
  }

  getTotal(){
    let total = 0;
    this.entries.forEach(element => {
      if(element.type == 0) total += element.value
      else total -= element.value
    });

    return total;
  }

}
