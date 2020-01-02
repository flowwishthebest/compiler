import { IToken } from './tokens/token.interface';

export interface IScanner {
    getTokensLazy(): Generator<IToken>;
}
