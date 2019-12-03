import { Token } from './token';
import { ETokenType, IToken } from './token.interface';

export class While extends Token implements IToken {
    constructor() {
        super(ETokenType.WHILE, null);
    }
}
