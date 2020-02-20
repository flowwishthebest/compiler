import { AST } from "./ast"
import { VariableDeclarationAST } from "./variable-declaration.ast";
import { CompoundAST } from "./compound.ast";

export class BlockAST extends AST {

    constructor(
        private readonly _declarations: Array<VariableDeclarationAST>,
        private readonly _compoundStatement: CompoundAST,
    ) {
        super();
    }

    public getDeclarations(): Array<VariableDeclarationAST> {
        return this._declarations;
    }

    public getCompoundStatement(): CompoundAST {
        return this._compoundStatement;
    }
}
