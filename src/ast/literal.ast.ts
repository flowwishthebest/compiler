import { AST } from "./ast";
import { Token } from "../tokens/token";

export class LiteralAST<T = any> extends AST {
    constructor(private readonly _token: Token) {
        super();
    }

    public getType(): string {
        return this._token.getType();
    }

    public getValue(): T {
        return this._token.getValue();
    }
}
