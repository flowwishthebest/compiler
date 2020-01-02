import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class RBraToken extends Token<void> {
    constructor() {
        super(ETokenType.RBRA);
    }
}
