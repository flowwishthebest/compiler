import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class MinusToken extends Token<void> {
    constructor() {
        super(ETokenType.MINUS);
    }
}
