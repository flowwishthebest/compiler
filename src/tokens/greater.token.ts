import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class GreaterToken extends Token<void> {
    constructor() {
        super(ETokenType.GREATER);
    }
}
