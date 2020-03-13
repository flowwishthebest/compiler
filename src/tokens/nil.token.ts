import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class NilToken extends Token<null> {
    constructor() {
        super(ETokenType.NIL, null);
    }
}
