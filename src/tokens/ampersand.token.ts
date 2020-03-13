import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class AmpersandToken extends Token<void> {
    constructor() {
        super(ETokenType.AMPERSAND);
    }
}
