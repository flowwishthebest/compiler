import { IToken } from '../tokens/token.interface';
import { Ast } from './abstract.ast';

export class NumAst extends Ast {

    constructor(token: IToken) {
        super(token);
    }
}
