import { AST } from "./ast";
import { Token } from "../tokens/token";
import { VariableAST } from "./var.ast";

export class AssignAST extends AST {

    constructor(
        private readonly _left: VariableAST,
        private readonly _token: Token,
        private readonly _right: AST,
    ) {
        super();
    }

    public getToken(): Token {
        return this._token;
    }

    public getLeft(): VariableAST {
        return this._left;
    }

    public getRight(): AST {
        return this._right;
    }
}
