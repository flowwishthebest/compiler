import { Token } from "./tokens/token";

export abstract class AST {
}

export class BinOpAST extends AST {

    constructor (
        private readonly _left: AST,
        private readonly _op: Token,
        private readonly _right: AST,
    ) {
        super();
    }

    public getToken(): Token {
        return this._op;
    }

    public getLeft(): AST {
        return this._left;
    }

    public getRight(): AST {
        return this._right;
    }
}

export class NumberAST extends AST {
    constructor(private readonly _token: Token) {
        super();
    }

    public getToken(): Token {
        return this._token;
    }
}