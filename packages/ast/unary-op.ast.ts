import { IToken } from '../tokens/token.interface';
import { Ast, INode } from './abstract.ast';

export class UnaryOpAst extends Ast {

    constructor(token: IToken, op: INode) {
        super(token, op);
    }
}
