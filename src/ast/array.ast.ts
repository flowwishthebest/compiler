import { AST } from "./ast";

export class ArrayAST extends AST {
    constructor(private readonly _elements: Array<AST>) {
        super();
    }

    public getElements(): Array<AST> {
        return this._elements;
    }
}
