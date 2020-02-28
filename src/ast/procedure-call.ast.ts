import { ParametersAST } from "./parameters.ast"
import { AST } from ".";
import { Token } from "../tokens/token";

export class ProcedureCallAST extends AST {
    constructor(
        private readonly _procedureName: string,
        private readonly _params: Array<ParametersAST>,
        private readonly _token: Token,
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
}
