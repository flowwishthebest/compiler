import { Token } from "../tokens/token"
import { AST } from "./ast";

export class TypeAST extends AST {

    constructor(private readonly _token: Token) {
        super();
    }

    public getToken(): Token {
        return this._token;
    }
}
