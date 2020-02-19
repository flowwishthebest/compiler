import { AST } from "./ast";
import { Token } from "../tokens/token";

export class UnaryOpAST extends AST {

    constructor(
        private readonly _token: Token,
        private readonly _expr: AST,
    ) {
        super();
    }

    public getToken(): Token {
        return this._token;
    }

    public getExpr(): AST {
        return this._expr;
    }
}
