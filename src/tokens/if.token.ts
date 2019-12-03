import { Token } from './token';
import { ETokenType, IToken } from './token.interface';

export class If extends Token implements IToken {
    constructor() {
        super(ETokenType.IF, null);
    }
}
