import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class LParToken extends Token<void> {
    constructor() {
        super(ETokenType.LPAR);
    }
}
