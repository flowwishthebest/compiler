import { PlusToken } from "./tokens/plus.token";
import { MulToken } from "./tokens/mul.token";
import { Parser } from "./parser";
import { MinusToken } from "./tokens/minus.token";
import { DivToken } from "./tokens/div.token";
import { ASTVisitor } from "./ast-visitor";
import { BinOpAST } from "./ast/bin-op.ast";
import { NumberAST } from "./ast/number.ast";
import { UnaryOpAST } from "./ast/unary-op.ast";

export class Interpreter extends ASTVisitor {
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
            case DivToken: {
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
}