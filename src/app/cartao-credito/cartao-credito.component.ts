import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable  } from "angularfire2/database";
import { CompraCartao} from './compra-cartao';

@Component({
  selector: 'app-cartao-credito',
  templateUrl: './cartao-credito.component.html'
})
export class CartaoCreditoComponent implements OnInit{

  model = new CompraCartao('', '', 0, 0);
  listOservable: FirebaseListObservable<any>;
  listaCompras: Array<CompraCartao> = [];

  isEdit = false;
  indexOfObject = null;

  constructor(db: AngularFireDatabase) {
    this.listOservable = db.list('compras_cartao');
  }
  
  ngOnInit(): void {
    this.getCompras();
  }

  getCompras(){
    this.listOservable.subscribe(value => { 
      this.listaCompras = [];
      Object.keys(value).forEach(element => {
        var descricao : string = (value[element].descricao);
        var observacoes : string = (value[element].observacoes);
        var valor : number = (value[element].valor);
        var parcelas : number = (value[element].parcelas);
        var key : string = (value[element].$key);
        var compra : CompraCartao = new CompraCartao(descricao, observacoes, parcelas, valor);
        compra.setKey(key);
        this.listaCompras.push(compra);
      });
      console.log(this.listaCompras);
    });
  }

  onSubmit() {
    // Verificando se estamos inserindo um objeto ou editando um existente
    if (!this.isEdit) {
      // Salvando no AngularFire 2
      console.log(this.model);
      this.listOservable.push(this.model);
    } else {
      this.listOservable.update(this.model.getKey(), this.model);
    }

    // Voltando os valores para edição
    this.model = new CompraCartao('', '', 0, 0);
    this.indexOfObject = null;
    this.isEdit = false;
  }

  valorMes() {
    let soma = 0.0;

    for (let compra of this.listaCompras ) {
      soma = soma + compra.valor;
    }

    return soma;
  }

  valorTotal() {
    let soma = 0.0;

    for (let compra of this.listaCompras ) {
      soma = soma + compra.valorTotal();
    }

    return soma;
  }

  editItem(compra: CompraCartao){
    this.isEdit = true;
    this.model = compra;
  }

  removeItem(compra: CompraCartao){
    this.listOservable.remove(compra.getKey());
  }
}
