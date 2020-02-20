import { AST } from "./ast";

export class CompoundAST extends AST {
    private readonly _children: Array<AST> = [];

    constructor() {
        super();
    }

    public getChildren(): Array<AST> {
        return this._children;
    }
}
