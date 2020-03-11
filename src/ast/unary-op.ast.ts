import { AST } from "./ast";
import { Token } from "../tokens/token";

export class UnaryOpAST extends AST {

    constructor(
        private readonly _operator: Token,
        private readonly _right: AST,
    ) {
        super();
    }

    public getOperator(): Token {
        return this._operator;
    }

    public getRight(): AST {
        return this._right;
    }
}
