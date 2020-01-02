import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class DivToken extends Token<string> {
    constructor() {
        super(ETokenType.DIV, '/');
    }
}
