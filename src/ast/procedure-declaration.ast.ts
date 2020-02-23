import { Token } from "../tokens/token"
import { BlockAST } from "./block.ast"
import { AST } from ".";

export class ProcedureDeclarationAST extends AST {
    constructor(
        private readonly _name: Token,
        private readonly _block: BlockAST,
    ) {
        super();
    }

    public getName(): Token {
        return this._name;
    }

    public getBlock(): BlockAST {
        return this._block;
    }
}
