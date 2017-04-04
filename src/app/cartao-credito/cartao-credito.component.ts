import { Component, OnInit } from '@angular/core';
import {CompraCartao} from './compra-cartao';

@Component({
  selector: 'app-cartao-credito',
  templateUrl: './cartao-credito.component.html'
})
export class CartaoCreditoComponent implements OnInit{

  model = new CompraCartao('', '', 0, 0);
  listaCompras: Array<CompraCartao> = [
    new CompraCartao('PAYPAL DO BRASIL', 'Fone de Ouvido na Wallmart', 8, 8.16),
    new CompraCartao('LIVRARIA CULTURA FORT', 'Livro Persuassão', 1, 52.10),
    new CompraCartao('OUTROS *ESTACIONAM.', '', 1.0, 3.0),
  ];

  isEdit = false;
  indexOfObject = null;

  constructor() { }

  ngOnInit(): void { }

  onSubmit() {
    // Verificando se estamos inserindo um objeto ou editando um existente
    if (!this.isEdit) {
      this.listaCompras.push(this.model);
      this.model = new CompraCartao('', '', 0, 0);
    } else {
      this.listaCompras[this.indexOfObject] = this.model;
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
    this.indexOfObject = this.listaCompras.indexOf(compra);
  }

  removeItem(compra){
    let index = this.listaCompras.indexOf(compra);
    this.listaCompras.splice(index, 1);
  }
}
