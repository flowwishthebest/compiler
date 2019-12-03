export interface IToken {
    readonly type: ETokenType;
    readonly value: any;
}

export enum ETokenType {
    AND = 'AND',
    ID = 'ID',
    IF = 'IF',
    WHILE = 'WHILE',
    TRUE = 'TRUE',
    FALSE = 'FALSE',
}
