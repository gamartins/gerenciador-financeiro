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

  constructor() { }

  valorTotal(){
    let valorTotal = 0;

    for (let item of this.itensPoupanca){
      valorTotal += item.valor;
    }

    return valorTotal;
  }

  onSubmit(){

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
