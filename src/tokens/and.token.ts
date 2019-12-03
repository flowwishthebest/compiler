import { ETokenType, IToken } from './token.interface';

export class And implements IToken {
    public readonly value = null;
    public readonly type: ETokenType = ETokenType.AND;
}
