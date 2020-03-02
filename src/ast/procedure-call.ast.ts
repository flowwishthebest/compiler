import { ParametersAST } from "./parameters.ast"
import { AST } from ".";
import { Token } from "../tokens/token";
import { ProcedureSymbol } from "../symbols";

export class ProcedureCallAST extends AST {
    constructor(
        private readonly _procedureName: string,
        private readonly _params: Array<ParametersAST>,
        private readonly _token: Token,
        private _procedureSymbol?: ProcedureSymbol,
    ) {
        super();
    }

    public getProcedureName(): string {
        return this._procedureName;
    }

    public getParams(): Array<ParametersAST> {
        return this._params;
    }

    public getToken(): Token {
        return this._token;
    }

    public getProcedureSymbol(): ProcedureSymbol {
        return this._procedureSymbol;
    }

    public setProcedureSymbol(v: ProcedureSymbol): void {
        this._procedureSymbol = v;
    }
}
