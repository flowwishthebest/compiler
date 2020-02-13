import { DivToken } from '../tokens/div.token';
import { MinusToken } from '../tokens/minus.token';
import { MulToken } from '../tokens/mul.token';
import { PlusToken } from '../tokens/plus.token';
import { INode } from './abstract.ast';
import { BinOpAst } from './bin-op.ast';
import { NumAst } from './num.ast';
import { UnaryOpAst } from './unary-op.ast';

export class NodeVisitor {

    public visit(node: INode): any {
        if (node instanceof BinOpAst) {
            return this._visitBinOpAst(node);
        } else if (node instanceof NumAst) {
            return this._visitNumAst(node);
        } else if (node instanceof UnaryOpAst) {
            return this._visitUnaryOpAst(node);
        } else {
            return this._genericVisit(node);
        }
    }

    private _genericVisit(node: INode): never {
        const visitMethod = 'visit' + node.constructor.name;
        throw new Error(`No ${visitMethod} method`);
    }

    private _visitBinOpAst(node: INode): any {
        const token = node.getToken();
        const left = node.getLeft();
        const right = node.getRight();

        if (token instanceof PlusToken) {
            return this.visit(left) + this.visit(right);
        } else if (token instanceof MinusToken) {
            return this.visit(left) - this.visit(right);
        } else if (token instanceof MulToken) {
            return this.visit(left) * this.visit(right);
        } else if (token instanceof DivToken) {
            return this.visit(left) / this.visit(right);
        } else {
            return this._genericVisit(node);
        }
    }

    private _visitUnaryOpAst(node: INode): any {
        const token = node.getToken();
        const expr = this.visit(node.getLeft());

        if (token instanceof PlusToken) {
            return +expr;
        } else if (token instanceof MinusToken) {
            return -expr;
        }
    }

    private _visitNumAst(node: INode): any {
        return node.getToken().getValue();
    }
}
