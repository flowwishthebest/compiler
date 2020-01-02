import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class WhileToken extends Token<void> {
    constructor() {
        super(ETokenType.WHILE);
    }
}
