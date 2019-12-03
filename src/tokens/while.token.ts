import { ETokenType, IToken } from './token.interface';

export class While implements IToken {
    public readonly value = null;
    public readonly type: ETokenType = ETokenType.AND;
}
