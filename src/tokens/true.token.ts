import { ETokenType, IToken } from './token.interface';

export class True implements IToken {
    public readonly value: boolean = true;
    public readonly type: ETokenType = ETokenType.TRUE;
}
