import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class FloatConstToken extends Token<number> {
    constructor(value: number) {
        super(ETokenType.FLOAT_CONST, value);
    }
}
