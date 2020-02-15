import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class MinusToken extends Token<void> {
    constructor() {
        super(ETokenType.MINUS);
    }
}
