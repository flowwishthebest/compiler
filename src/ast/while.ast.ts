import { AST } from "./ast";

export class WhileAST extends AST {

    constructor(
        private readonly _condition: AST,
        private readonly _body: AST,
    ) {
        super();
    }

    public getBody(): AST {
        return this._body;
    }

    public getCondition(): AST {
        return this._condition;
    }
}
