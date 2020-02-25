import { MySymbol, VariableSymbol } from "./symbols";

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
