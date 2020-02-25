import { MySymbol } from "./my.symbol";
import { VariableSymbol } from "./variable.symbol";

export class ProcedureSymbol extends MySymbol {
    constructor(
        name: string,
        private readonly _params: Array<VariableSymbol> = [],
    ) {
        super(name);
    }

    public getParams(): Array<VariableSymbol> {
        return this._params;
    }
}
