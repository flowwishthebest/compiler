import { ASTVisitor } from "./ast-visitor"
import { SymbolTable } from "./symbol-table"
import { BlockAST } from "./ast/block.ast";
import { ProgramAST } from "./ast/program.ast";
import { BinOpAST, NumberAST, UnaryOpAST, CompoundAST, EmptyAST, AssignAST, VariableAST } from "./ast";
import { VariableDeclarationAST } from "./ast/variable-declaration.ast";
import { VariableSymbol } from "./symbols";
import { ProcedureDeclarationAST } from "./ast/procedure-declaration.ast";

export class SymbolTableBuilder extends ASTVisitor {
    public readonly _symbolTable: SymbolTable;

    constructor() {
        super();
        this._symbolTable = new SymbolTable();
    }

    public visitBlockAST(node: BlockAST): void {
        node.getDeclarations().forEach((d) => this.visit(d));
        this.visit(node.getCompoundStatement());
    }

    public visitProgramAST(node: ProgramAST): void {
        this.visit(node.getBlock());
    }

    public visitBinOpAST(node: BinOpAST): void {
        this.visit(node.getLeft());
        this.visit(node.getRight());
    }

    public visitNumberAST(node: NumberAST): void {
        // TODO:
        return;
    }

    public visitUnaryOpAST(node: UnaryOpAST): void {
        this.visit(node.getExpr());
    }

    public visitCompoundAST(node: CompoundAST): void {
        node.getChildren().forEach((c) => this.visit(c));
    }

    public visitEmptyAST(node: EmptyAST): void {
        // TODO:
        return;
    }

    public visitVariableDeclarationAST(node: VariableDeclarationAST): void {
        const typeName = node.getType().getToken().getValue();
        const typeSymbol = this._symbolTable.lookup(typeName);
        const varName = node.getVariable().getToken().getValue();
        this._symbolTable.define(new VariableSymbol(varName, typeSymbol));
    }

    public visitAssignAST(node: AssignAST): void | never {
        const varName = node.getLeft().getToken().getValue();
        const varSymbol = this._symbolTable.lookup(varName);

        if (!varSymbol) {
            throw new Error('Name error: ' + varName);
        }
    
        this.visit(node.getRight());
    }

    public visitVariableAST(node: VariableAST): void {
        const varName = node.getToken().getValue();
        const varSymbol = this._symbolTable.lookup(varName);
    
        if (!varSymbol) {
            throw new Error('Name error: ' + varName); 
        }
    }

    public visitProcedureDeclarationAST(node: ProcedureDeclarationAST): void {
        // TODO:
        return;
    }
}
