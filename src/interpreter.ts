import { Parser } from "./parser";
import { FloatDivToken, MinusToken, MulToken, PlusToken } from "./tokens";
import { ASTVisitor } from "./ast-visitor";
import { UnaryOpAST, NumberAST, BinOpAST, EmptyAST, CompoundAST, AssignAST, VariableAST } from "./ast";

export class Interpreter extends ASTVisitor {
    private readonly GLOABAL_SCOPE: Record<string, any> = Object.create(null);

    constructor(private readonly _parser: Parser) {
        super();
    }

    public interpret(): number {
        return this.visit(this._parser.parse());
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
        this.GLOABAL_SCOPE[variableName] = this.visit(node.getRight());
    }

    public visitVariableAST(node: VariableAST): number {
        const variableName = node.getToken().getValue();
        const value = this.GLOABAL_SCOPE[variableName];

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
}