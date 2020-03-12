import { AST } from ".";
import { Token } from "../tokens/token";

export class VarDeclAST extends AST {

    constructor(
        private readonly _tokenName: Token,
        private readonly _expressionInitializer: AST,
    ) {
        super();
    }

    public getName(): string {
        return this._tokenName.getValue();
    }

    public getInitializer(): AST {
        return this._expressionInitializer;
    }
    public getToken(): Token {
        return this._tokenName;
    }
}