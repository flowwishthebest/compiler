import { AST } from "./ast";
import { Token } from "../tokens/token";

export class BinOpAST extends AST {

    constructor (
        private readonly _left: AST,
        private readonly _op: Token,
        private readonly _right: AST,
    ) {
        super();
    }

    public getOperator(): Token {
        return this._op;
    }

    public getLeft(): AST {
        return this._left;
    }

    public getRight(): AST {
        return this._right;
    }
}
