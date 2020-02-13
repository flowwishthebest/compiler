import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class MulToken extends Token<string> {
    constructor() {
        super(ETokenType.MUL, '*');
    }
}
