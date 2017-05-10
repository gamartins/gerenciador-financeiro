export class ItemPoupanca {
  constructor(
    public descricao: string,
    public observacao: string,
    public valor: number) { }

  addValor(valor: number) {
    this.valor += valor;
  }

  removeValor(valor: number){
    this.valor -= valor;
  }
}
