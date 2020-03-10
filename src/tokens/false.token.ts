import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class FalseToken extends Token<void> {
    constructor() {
        super(ETokenType.FALSE);
    }
}
