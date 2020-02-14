import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class MulToken extends Token<void> {
    constructor() {
        super(ETokenType.MUL);
    }
}
