import { AST } from "./ast";
import { BlockAST } from './block.ast';

export class WhileAST extends AST {

    constructor(
        private readonly _condition: AST,
        private readonly _block: AST,
    ) {
        super();
    }

    public getBlock(): AST {
        return this._block;
    }

    public getCondition(): AST {
        return this._condition;
    }
}
