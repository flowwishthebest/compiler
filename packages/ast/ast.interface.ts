import { IToken } from '../tokens/token.interface';

export interface INode {
    getToken(): IToken;
    getLeft(): INode;
    getRight(): INode;
}
