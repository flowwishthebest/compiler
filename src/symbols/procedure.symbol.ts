import { MySymbol } from "./my.symbol";
import { VariableSymbol } from "./variable.symbol";
import { BlockAST } from "../ast";

export class ProcedureSymbol extends MySymbol {
    constructor(
        name: string,
        private readonly _params: Array<VariableSymbol> = [],
        private _block?: BlockAST,
    ) {
        super(name);
    }

    public getParams(): Array<VariableSymbol> {
        return this._params;
    }

    public getBlock(): BlockAST {
        return this._block;
    }

    public setBlock(ast: BlockAST): this {
        this._block = ast;

        return this;
    }
}
