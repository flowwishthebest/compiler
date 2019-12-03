import { Token } from './token';
import { ETokenType, IToken } from './token.interface';

export class False extends Token implements IToken {
    constructor() {
        super(ETokenType.FALSE, false);
    }
}
