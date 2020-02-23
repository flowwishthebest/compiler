import { Parser } from "./parser";
import { FloatDivToken, MinusToken, MulToken, PlusToken } from "./tokens";
import { ASTVisitor } from "./ast-visitor";
import { UnaryOpAST, NumberAST, BinOpAST, EmptyAST, CompoundAST, AssignAST, VariableAST, AST } from "./ast";
import { ProgramAST } from "./ast/program.ast";
import { BlockAST } from "./ast/block.ast";
import { VariableDeclarationAST } from "./ast/variable-declaration.ast";
import { TypeAST } from "./ast/type.ast";
import { IntegerDivToken } from "./tokens/integer-div.token";
import { ProcedureDeclarationAST } from "./ast/procedure-declaration.ast";

export class Interpreter extends ASTVisitor {
    private readonly GLOABAL_SCOPE: Map<string, any>;

    constructor(private readonly _tree: AST) {
        super();

        this.GLOABAL_SCOPE = new Map();
    }

    public interpret(): void {
        return this.visit(this._tree);
    }

    public getGlobalScope(): Map<string, any> {
        return this.GLOABAL_SCOPE;
    }

    public visitBinOpAST(node: BinOpAST): number {
        switch (node.getToken().constructor) {
            case PlusToken: {
                return this.visit(node.getLeft()) + this.visit(node.getRight());
            }
            case MinusToken: {
                return this.visit(node.getLeft()) - this.visit(node.getRight());
            }
            case MulToken: {
                return this.visit(node.getLeft()) * this.visit(node.getRight());
            }
            case FloatDivToken: {
                return this.visit(node.getLeft()) / this.visit(node.getRight());
            }
            case IntegerDivToken: {
                const result = this.visit(node.getLeft()) / this.visit(node.getRight());
                return Math.trunc(result);
            }
            default: {
                throw new Error(
                    `Unknown op name ${node.getToken().constructor.name}`,
                );
            }
        }
    }

    public visitNumberAST(node: NumberAST): number {
        return node.getToken().getValue();
    }

    public visitUnaryOpAST(node: UnaryOpAST): number {
        switch (node.getToken().constructor) {
            case PlusToken: {
                return +this.visit(node.getExpr());
            }
            case MinusToken: {
                return -this.visit(node.getExpr());
            }
        }
    }

    public visitAssignAST(node: AssignAST): void {
        const variableName = node.getLeft().getToken().getValue();
        const variableValue = this.visit(node.getRight());
        this.GLOABAL_SCOPE.set(variableName, variableValue);
    }

    public visitVariableAST(node: VariableAST): number {
        const variableName = node.getToken().getValue();
        const value = this.GLOABAL_SCOPE.get(variableName);

        if (!value) {
            throw new Error('Name error: ' + value);
        }

        return value;
    }

    public visitCompoundAST(node: CompoundAST): void {
        node.getChildren().forEach((c) => this.visit(c));
    }

    public visitEmptyAST(node: EmptyAST): void {
        return;
    }

    public visitProgramAST(node: ProgramAST): void {
        this.visit(node.getBlock());
    }

    public visitBlockAST(node: BlockAST): void {
        node.getDeclarations().forEach((d) => this.visit(d));
        this.visit(node.getCompoundStatement());
    }

    public visitVariableDeclarationAST(node: VariableDeclarationAST): void {
        // TODO:
        return;
    }
    
    public visitTypeAST(node: TypeAST): void {
        // TODO:
        return;
    }

    public visitProcedureDeclarationAST(node: ProcedureDeclarationAST): void {
        // TODO:
        return;
    }
}