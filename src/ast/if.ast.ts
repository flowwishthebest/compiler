import { AST } from "./ast";

export class IfAST extends AST {
    constructor(
        private readonly _condition: AST,
        private readonly _ifPart: AST,
        private readonly _elsePart: AST = null,
    ) {
        super();
    }

    public getCondition(): AST {
        return this._condition;
    }

    public getIfPart(): AST {
        return this._ifPart;
    }

    public getElsePart(): AST | null {
        return this._elsePart;
    }
}
