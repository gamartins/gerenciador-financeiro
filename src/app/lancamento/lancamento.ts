export class Lancamento {
    constructor(
        public name: string,
        public month: number,
        public group: number, 
        public type: number, 
        public value: number,
    ) {}
}
