import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class IntegerConstToken extends Token<number> {
    constructor(value: number) {
        super(ETokenType.INTEGER_CONST, value);
    }
}
