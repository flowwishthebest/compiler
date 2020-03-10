import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class BangEqualToken extends Token<void> {
    constructor() {
        super(ETokenType.BANG_EQUAL);
    }
}
