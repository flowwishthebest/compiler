import { Token } from './token';
import { ETokenType, IToken } from './token.interface';

export class True extends Token implements IToken {
    constructor() {
        super(ETokenType.TRUE, true);
    }
}
