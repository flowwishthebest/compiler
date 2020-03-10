import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class LessEqualToken extends Token<void> {
    constructor() {
        super(ETokenType.LESS_EQUAL);
    }
}
