import { Component } from '@angular/core';
import {ItemPoupanca} from "./item-poupanca";

@Component({
  selector: 'app-poupanca',
  templateUrl: './poupanca.component.html'
})

export class PoupancaComponent {

  itensPoupanca: Array<ItemPoupanca> = [
    new ItemPoupanca("Viagem - 2017", "", 1700.00),
    new ItemPoupanca("Cursos", "", 530.00)
  ];

  // operacao: Object = {};
  operacao: number[] = [0,0,0];
  novoItem: ItemPoupanca = new ItemPoupanca("", "", 0.0);

  constructor() { }

  valorTotal(){
    let valorTotal = 0;

    for (let item of this.itensPoupanca){
      valorTotal += item.valor;
    }

    return valorTotal;
  }

  removeConta(item){
    let index = this.itensPoupanca.indexOf(item);
    this.itensPoupanca.splice(index, 1);
  }

  addConta(){
    this.itensPoupanca.push(this.novoItem);
    this.novoItem = new ItemPoupanca(" ", "", 0.0);
  }

  operacaoEmConta(){

    // Operação de deposito
    if (this.operacao[1] == 0) {
      this.itensPoupanca[this.operacao[0]].addValor(this.operacao[2]);
      console.log("deposito");
    }

    // Operação de resgate
    if (this.operacao[1] == 1) {
      this.itensPoupanca[this.operacao[0]].removeValor(this.operacao[2]);
      console.log("resgate");
    }
  }
}
