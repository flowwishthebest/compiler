export enum ETokenType {
    EOF = 'EOF',
    NUMBER = 'NUMBER',
    PLUS = 'PLUS',
    MINUS = 'MINUS',
}

export class Token {
    constructor(
        public readonly type: ETokenType,
        public readonly value?: any,
    ) {}
}
