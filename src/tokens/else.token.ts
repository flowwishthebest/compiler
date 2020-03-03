import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class ElseToken extends Token<void> {
    constructor() {
        super(ETokenType.ELSE);
    }
}
