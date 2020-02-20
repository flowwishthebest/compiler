import { AST } from ".";
import { VariableAST } from "./var.ast";
import { TypeAST } from "./type.ast";

export class VariableDeclarationAST extends AST {

    constructor(
        private readonly _variable: VariableAST,
        private readonly _type: TypeAST,
    ) {
        super();
    }

    public getVariable(): VariableAST {
        return this._variable;
    }

    public getType(): TypeAST {
        return this._type;
    }
}