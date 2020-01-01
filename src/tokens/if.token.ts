import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class IfToken extends Token<void> {
    constructor() {
        super(ETokenType.IF);
    }
}
