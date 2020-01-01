import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class FalseToken extends Token<boolean> {
    constructor() {
        super(ETokenType.FALSE, false);
    }
}
