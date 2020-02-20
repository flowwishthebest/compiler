import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class IntegerDivToken extends Token<void> {
    constructor() {
        super(ETokenType.INTEGER_DIV);
    }
}
