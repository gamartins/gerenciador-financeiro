import { Component, OnInit } from '@angular/core';
import { ItemPoupanca } from "./item-poupanca";
import { AngularFireDatabase, FirebaseListObservable  } from "angularfire2/database";

@Component({
  selector: 'app-poupanca',
  templateUrl: './poupanca.component.html'
})

export class PoupancaComponent implements OnInit {

  itensPoupanca: Array<ItemPoupanca> = [
    // new ItemPoupanca("Viagem - 2017", "", 1700.00),
    // new ItemPoupanca("Cursos", "", 530.00)
  ];

  listObservable: FirebaseListObservable<any>;
  operacao: number[] = [0,0,0];
  novoItem: ItemPoupanca = new ItemPoupanca("", "", 0.0);

  constructor(db: AngularFireDatabase) {
    this.listObservable = db.list('conta_poupanca');
   }

   ngOnInit(): void {
     this.getContas()
   }

   getContas(){
     this.listObservable.subscribe(value => { 
      this.itensPoupanca = [];
      Object.keys(value).forEach(element => {
        var descricao : string = (value[element].descricao);
        var observacao: string = (value[element].observacao);
        var valor : number = (value[element].valor);
        var key : string = (value[element].$key);
        var item : ItemPoupanca = new ItemPoupanca(descricao, observacao, valor);
        item.setKey(key);
        this.itensPoupanca.push(item);
      });
      console.log(this.itensPoupanca);
    });
   }

  valorTotal(){
    let valorTotal = 0;

    for (let item of this.itensPoupanca){
      valorTotal += item.valor;
    }

    return valorTotal;
  }

  removeConta(item: ItemPoupanca){
    this.listObservable.remove(item.getKey());
  }

  addConta(){
    this.listObservable.push(this.novoItem);
    this.novoItem = new ItemPoupanca(" ", "", 0.0);
  }

  operacaoEmConta(){
    let item: ItemPoupanca = this.itensPoupanca[this.operacao[0]];
    
    // Operação de deposito
    if (this.operacao[1] == 0) {
      this.itensPoupanca[this.operacao[0]].addValor(this.operacao[2]);
    }

    // Operação de resgate
    if (this.operacao[1] == 1) {
      this.itensPoupanca[this.operacao[0]].removeValor(this.operacao[2]);
    }

    this.listObservable.update(item.getKey(), item);
  }
}
