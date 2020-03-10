import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class EqualEqualToken extends Token<void> {
    constructor() {
        super(ETokenType.EQUAL_EQUAL);
    }
}
