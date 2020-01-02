import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class SemicolonToken extends Token<void> {
    constructor() {
        super(ETokenType.SEMICOLON);
    }
}
