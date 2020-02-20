import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class CommaToken extends Token<void> {
    constructor() {
        super(ETokenType.COMMA);
    }
}
