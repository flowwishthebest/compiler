import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class ClosedBracketToken extends Token<void> {
    constructor() {
        super(ETokenType.CLOSED_BRACKET);
    }
}
