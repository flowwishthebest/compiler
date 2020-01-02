import { Ast, INode } from '../../../parser/src';
import { IToken } from '../tokens/token.interface';

export class BinOpAst extends Ast {

    constructor(token: IToken, left: INode, right: INode) {
        super(token, left, right);
    }
}
