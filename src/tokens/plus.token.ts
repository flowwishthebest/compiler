import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class PlusToken extends Token<void> {
    constructor() {
        super(ETokenType.PLUS);
    }
}
