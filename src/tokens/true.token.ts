import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class TrueToken extends Token<boolean> {
    constructor() {
        super(ETokenType.TRUE, true);
    }
}
