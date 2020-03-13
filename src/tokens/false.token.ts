import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class FalseToken extends Token<boolean> {
    constructor() {
        super(ETokenType.FALSE, false);
    }
}
