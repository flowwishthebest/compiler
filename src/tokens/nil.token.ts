import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class NilToken extends Token<void> {
    constructor() {
        super(ETokenType.NIL);
    }
}
