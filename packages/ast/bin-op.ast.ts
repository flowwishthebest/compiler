import { IToken } from '../tokens/token.interface';
import { Ast, INode } from './abstract.ast';

export class BinOpAst extends Ast {

    constructor(token: IToken, left: INode, right: INode) {
        super(token, left, right);
    }
}
