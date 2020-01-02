import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class RParToken extends Token<void> {
    constructor() {
        super(ETokenType.RPAR);
    }
}
