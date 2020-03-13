import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class CaretToken extends Token<void> {
    constructor() {
        super(ETokenType.CARET);
    }
}
