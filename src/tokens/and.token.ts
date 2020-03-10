import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class AndToken extends Token<void> {
    constructor() {
        super(ETokenType.AND);
    }
}
