import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class DoToken extends Token<void> {
    constructor() {
        super(ETokenType.DO);
    }
}
