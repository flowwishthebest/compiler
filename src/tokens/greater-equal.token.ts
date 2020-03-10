import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class GreaterEqualToken extends Token<void> {
    constructor() {
        super(ETokenType.GREATER_EQUAL);
    }
}
