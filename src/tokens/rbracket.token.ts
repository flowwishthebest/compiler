import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class RBracketToken extends Token<void> {
    constructor() {
        super(ETokenType.RBRACKET);
    }
}
