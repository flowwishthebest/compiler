import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class SemicolonToken extends Token<void> {
    constructor() {
        super(ETokenType.SEMICOLON);
    }
}
