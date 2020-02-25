import { VariableAST } from "./var.ast"
import { AST } from ".";
import { TypeAST } from "./type.ast";

export class ParametersAST extends AST {
    constructor(
        private readonly _varNode: VariableAST,
        private readonly _typeNode: TypeAST,
    ) {
        super();
    }

    public getVarNode(): VariableAST {
        return this._varNode;
    }

    public getTypeNode(): TypeAST {
        return this._typeNode;
    }
}
