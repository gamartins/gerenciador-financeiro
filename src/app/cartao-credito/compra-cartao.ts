export class CompraCartao {
  private key: string;

  constructor(
    public descricao: string,
    public observacoes: string,
    public parcelas: number,
    public valor: number
    ) { }

  valorTotal(): number {
    return this.valor * this.parcelas;
  }

  setKey(key: string) {
    this.key = key;
  }
  
  getKey(): string {
    return this.key;
  }
}
