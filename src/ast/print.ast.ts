import { AST } from "./ast";

export class PrintAST extends AST {

    constructor (
        private readonly _expression: AST,
    ) {
        super();
    }

    public getExpression(): AST {
        return this._expression;
    }
}
