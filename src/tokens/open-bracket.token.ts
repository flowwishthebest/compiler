import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class OpenBracketToken extends Token<void> {
    constructor() {
        super(ETokenType.OPEN_BRACKET);
    }
}
