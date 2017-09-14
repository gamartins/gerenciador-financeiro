import { Component, OnInit } from '@angular/core';
import { ItemPoupanca } from './item-poupanca';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../app/services/auth.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-aplicacoes-financeiras',
  templateUrl: './aplicacoes-financeiras.component.html',
  styleUrls: ['./aplicacoes-financeiras.component.css']
})
export class AplicacoesFinanceirasComponent implements OnInit {
  static readonly TIPO_POUPANCA = '/poupanca'
  static readonly TIPO_INVESTIMENTO = '/investimento'
  static readonly TIPO_EMPRESTADO = '/emprestado'
  static readonly OPERACAO = {
    DEPOSIT: 0,
    REFUND: 1
  }

  nomeDaAplicacao = 'Nome da Aplicação'
  
  aplicacoesFinanceiras: Array<ItemPoupanca> = [];
  listObservable: FirebaseListObservable<any>;
  operacao = { item_position: 0, value: 0, type: 0 }
  novoItem: ItemPoupanca = new ItemPoupanca('', '', 0.0);

  constructor(angularFireDatabase: AngularFireDatabase, authService: AuthService, route: ActivatedRoute) {
    route.data.subscribe(data => {
      this.nomeDaAplicacao = this.formatString(data.tipoInvestimento)

      const user_id = authService.uuid;
      const url = 'user/' + user_id + data.tipoInvestimento
      this.listObservable = angularFireDatabase.list(url)
    })
  }

  ngOnInit(): void {
    this.getInvestment();
  }

  private formatString(name: string): string {
    return name = name.slice(1) + 's'
  }

  getInvestment() {
    this.listObservable.subscribe(value => {
      this.aplicacoesFinanceiras = [];
      Object.keys(value).forEach(position => {
        const descricao: string = (value[position].descricao);
        const observacao: string = (value[position].observacao);
        const valor: number = (value[position].valor);
        const key: string = (value[position].$key);
        const item: ItemPoupanca = new ItemPoupanca(descricao, observacao, valor);
        item.setKey(key);
        this.aplicacoesFinanceiras.push(item);
      });
    });
  }

  removeInvestment(item: ItemPoupanca) {
    this.listObservable.remove(item.getKey());
  }

  addInvestment() {
    this.listObservable.push(this.novoItem);
    this.novoItem = new ItemPoupanca('', '', 0.0);
  }

  totalValue() {
    let totalValue = 0
    for (const item of this.aplicacoesFinanceiras) { totalValue += item.valor }
    return totalValue;
  }

  operacaoEmConta() {
      const item: ItemPoupanca = this.aplicacoesFinanceiras[this.operacao.item_position];
      
      switch (this.operacao.type) {
        case AplicacoesFinanceirasComponent.OPERACAO.DEPOSIT:
          item.addValor(this.operacao.value)
          break;

        case AplicacoesFinanceirasComponent.OPERACAO.REFUND:
          item.removeValor(this.operacao.value)
          break;

        default:
          break;
      }

      this.listObservable.update(item.getKey(), item);
    }

}
