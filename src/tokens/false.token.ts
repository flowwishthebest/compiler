import { ETokenType, IToken } from './token.interface';

export class False implements IToken {
    public readonly value: boolean = false;
    public readonly type: ETokenType = ETokenType.FALSE;
}
