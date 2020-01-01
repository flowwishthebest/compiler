import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class LessToken extends Token<void> {
    constructor() {
        super(ETokenType.LESS);
    }
}
