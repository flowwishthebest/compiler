import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class LParenToken extends Token<void> {
    constructor() {
        super(ETokenType.LPAREN);
    }
}
