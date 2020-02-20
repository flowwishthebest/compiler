import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class FloatDivToken extends Token<void> {
    constructor() {
        super(ETokenType.FLOAT_DIV);
    }
}
