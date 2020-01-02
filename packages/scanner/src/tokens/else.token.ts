import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class ElseToken extends Token<void> {
    constructor() {
        super(ETokenType.ELSE);
    }
}
