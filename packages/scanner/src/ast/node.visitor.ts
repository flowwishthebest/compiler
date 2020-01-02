import { BinOpAst, INode, NumAst } from '../../../parser/src';
import { DivToken } from '../tokens/div.token';
import { MinusToken } from '../tokens/minus.token';
import { MulToken } from '../tokens/mul.token';
import { PlusToken } from '../tokens/plus.token';

export class NodeVisitor {

    public visit(node: INode): any {
        if (node instanceof BinOpAst) {
            return this._visitBinOpAst(node);
        } else if (node instanceof NumAst) {
            return this._visitNumAst(node);
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

    private _visitNumAst(node: INode): any {
        return node.getToken().getValue();
    }
}
