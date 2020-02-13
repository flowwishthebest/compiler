export enum ETokenType {
    NUM = 'NUM',
    ID = 'ID',
    IF = 'IF',
    ELSE = 'ELSE',
    WHILE = 'WHILE',
    DO = 'DO',
    LBRA = 'LBRA',
    RBRA = 'RBRA',
    LPAR = 'LPAR',
    RPAR = 'RPAR',
    PLUS = 'PLUS',
    MINUS = 'MINUS',
    LESS = 'LESS',
    EQUAL = 'EQUAL',
    SEMICOLON = 'SEMICOLON',
    EOF = 'EOF',
    TRUE = 'TRUE',
    FALSE = 'FALSE',
    MUL = 'MUL',
    DIV = 'DIV',
}

export interface IToken<T = any> {
    getType(): ETokenType;
    getValue(): T;
}
