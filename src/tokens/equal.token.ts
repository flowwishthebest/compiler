import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class EqualToken extends Token<void> {
    constructor() {
        super(ETokenType.EQUAL);
    }
}
