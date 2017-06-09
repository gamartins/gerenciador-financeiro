export class ItemPoupanca {
  private key: string;

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

  setKey(key: string){
    this.key = key;
  }

  getKey() : string{
    return this.key;
  }
}
