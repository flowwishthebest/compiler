import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class NumberToken extends Token<number> {
    constructor(value: number) {
        super(ETokenType.NUMBER, value);
    }
}
