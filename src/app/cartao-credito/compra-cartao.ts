export class CompraCartao {
  constructor(
    public descricao: string,
    public observacoes: string,
    public parcelas: number,
    public valor: number) { }

  valorTotal(): number {
    return this.valor * this.parcelas;
  }
}
