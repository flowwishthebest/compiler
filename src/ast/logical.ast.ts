import { AST } from "./ast";
import { Token } from "../tokens/token";

export class LogicalAST extends AST {

    constructor (
        private readonly _left: AST,
        private readonly _operator: Token,
        private readonly _right: AST,
    ) {
        super();
    }

    public getOperator(): Token {
        return this._operator;
    }

    public getLeft(): AST {
        return this._left;
    }

    public getRight(): AST {
        return this._right;
    }
}
