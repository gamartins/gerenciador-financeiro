import { Component, OnInit } from '@angular/core';
import { ItemPoupanca } from '../poupanca/item-poupanca';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-investimento',
  templateUrl: './investimento.component.html',
  styleUrls: ['./investimento.component.css']
})
export class InvestimentoComponent implements OnInit {

  itensPoupanca: Array<ItemPoupanca> = [];
  listObservable: FirebaseListObservable<any>;
  operacao: number[] = [0, 0, 0];
  novoItem: ItemPoupanca = new ItemPoupanca('', '', 0.0);

  constructor(db: AngularFireDatabase) {
    this.listObservable = db.list('investimento');
  }

  ngOnInit(): void {
      // this.itensPoupanca = this.getContas();
      this.getContas();
  }

  getContas() {
    // let list: Array<ItemPoupanca> = [];

    this.listObservable.subscribe(value => {
      this.itensPoupanca = [];
      Object.keys(value).forEach(element => {
        const descricao: string = (value[element].descricao);
        const observacao: string = (value[element].observacao);
        const valor: number = (value[element].valor);
        const key: string = (value[element].$key);
        const item: ItemPoupanca = new ItemPoupanca(descricao, observacao, valor);
        item.setKey(key);
        this.itensPoupanca.push(item);
      });
    });
  }

  removeConta(item: ItemPoupanca) {
    this.listObservable.remove(item.getKey());
  }

  addConta() {
    this.listObservable.push(this.novoItem);
    this.novoItem = new ItemPoupanca('', '', 0.0);
  }

  valorTotal() {
    let valorTotal = 0;

    for (const item of this.itensPoupanca){
      valorTotal += item.valor;
    }

    return valorTotal;
  }

  operacaoEmConta() {
      let item: ItemPoupanca = this.itensPoupanca[this.operacao[0]];

      // Operação de deposito
      if (this.operacao[1] === 0) {
        this.itensPoupanca[this.operacao[0]].addValor(this.operacao[2]);
      }

      // Operação de resgate
      if (this.operacao[1] === 1) {
        this.itensPoupanca[this.operacao[0]].removeValor(this.operacao[2]);
      }

      this.listObservable.update(item.getKey(), item);
    }

}
