import { Component, OnInit } from '@angular/core';
import {CompraCartao} from './compra-cartao';

@Component({
  selector: 'app-cartao-credito',
  templateUrl: './cartao-credito.component.html'
})
export class CartaoCreditoComponent implements OnInit{

  model = new CompraCartao('', '', 0, 0);
  listaCompras: Array<CompraCartao> = [
    // new CompraCartao('PAYPAL DO BRASIL', 'Fone de Ouvido na Wallmart', 8, 8.16),
    // new CompraCartao('LIVRARIA CULTURA FORT', 'Livro Persuassão', 1, 52.10),
    // new CompraCartao('OUTROS *ESTACIONAM.', '', 3.0, 1.0),
  ];

  constructor() { }

  ngOnInit(): void { }

  onSubmit() {
    this.listaCompras.push(this.model);
    this.model = new CompraCartao('', '', 0, 0);
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
}
