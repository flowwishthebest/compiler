import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class TrueToken extends Token<boolean> {
    constructor() {
        super(ETokenType.TRUE, true);
    }
}
