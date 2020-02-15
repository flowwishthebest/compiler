import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class RParenToken extends Token<void> {
    constructor() {
        super(ETokenType.RPAREN);
    }
}
