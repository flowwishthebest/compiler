import { ASTVisitor } from "./ast-visitor"
import { ScopedSymbolTable } from "./scoped-symbol-table"
import { BlockAST } from "./ast/block.ast";
import { ProgramAST } from "./ast/program.ast";
import { BinOpAST, NumberAST, UnaryOpAST, CompoundAST, EmptyAST, AssignAST, VariableAST } from "./ast";
import { VariableDeclarationAST } from "./ast/variable-declaration.ast";
import { VariableSymbol } from "./symbols";
import { ProcedureDeclarationAST } from "./ast/procedure-declaration.ast";
import { ProcedureSymbol } from "./procedure.symbol";

export class SemanticAnalyzer extends ASTVisitor {
    public  _scope: ScopedSymbolTable;

    constructor() {
        super();
        this._scope = null;
    }

    public visitBlockAST(node: BlockAST): void {
        node.getDeclarations().forEach((d) => this.visit(d));
        this.visit(node.getCompoundStatement());
    }

    public visitProgramAST(node: ProgramAST): void {
        const globalScope = new ScopedSymbolTable({
            scopeName: 'global',
            scopeLevel: 1,
            enclosingScope: this._scope, // will be null,
            initBuiltins: true,
        });

        this._scope = globalScope;

        console.log(`Enter scope: <${this._scope.getScopeName()}>`);

        this.visit(node.getBlock());

        globalScope.print();

        console.log(`Leave scope: <${this._scope.getScopeName()}>`);

        this._scope = this._scope.getEnclosingScope();
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

        const typeSymbol = this._scope.lookup(typeName);

        const varName = node.getVariable().getToken().getValue();

        const variableSymbol = new VariableSymbol(varName, typeSymbol);

        this._scope.define(variableSymbol);
    }

    public visitAssignAST(node: AssignAST): void | never {
        const varName = node.getLeft().getToken().getValue();
        const varSymbol = this._scope.lookup(varName);

        if (!varSymbol) {
            throw new Error('Name error: ' + varName);
        }
    
        this.visit(node.getRight());
    }

    public visitVariableAST(node: VariableAST): void {
        const varName = node.getToken().getValue();

        const varSymbol = this._scope.lookup(varName);
    
        if (!varSymbol) {
            throw new Error(`Symbol (Indentifier) not found <${varName}>`); 
        }
    }

    public visitProcedureDeclarationAST(node: ProcedureDeclarationAST): void {
        const procedureName = node.getName().getValue(); // TODO: api fix
        const procedureSymbol = new ProcedureSymbol(procedureName);

        this._scope.define(procedureSymbol);

        const procedureScope = new ScopedSymbolTable({
            scopeName: procedureName,
            scopeLevel: this._scope.getScopeLevel() + 1,
            enclosingScope: this._scope,
        });

        this._scope = procedureScope;

        console.log(`Enter scope: <${this._scope.getScopeName()}>`);

        node.getParameters().forEach((param) => {
            const type = param.getTypeNode().getToken().getValue();

            const paramType = this._scope.lookup(type);

            const paramName = param.getVarNode().getToken().getValue();

            const varSymbol = new VariableSymbol(paramName, paramType);

            this._scope.define(varSymbol);

            procedureSymbol.getParams().push(varSymbol);
        });

        this.visit(node.getBlock());

        procedureScope.print();

        console.log(`Leave scope: <${this._scope.getScopeName()}>`);

        this._scope = this._scope.getEnclosingScope();
    }
}
