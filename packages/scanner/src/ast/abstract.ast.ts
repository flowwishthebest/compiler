import { INode } from '../../../parser/src';
import { IToken } from '../tokens/token.interface';

export abstract class Ast implements INode {

    constructor(
        private readonly token: IToken,
        private readonly left?: INode,
        private readonly right?: INode,
    ) {}

    public getToken(): IToken<any> {
        return this.token;
    }

    public getLeft(): INode {
        return this.left;
    }

    public getRight(): INode {
        return this.right;
    }
}
