import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class IntegerToken extends Token<number> {
    constructor(value: number) {
        super(ETokenType.NUM, value);
    }
}
