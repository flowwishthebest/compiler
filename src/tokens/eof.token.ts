import { Token } from './token';
import { ETokenType, IToken } from './token.interface';

export class Eof extends Token implements IToken {
    constructor() {
        super(ETokenType.EOF, null);
    }
}
