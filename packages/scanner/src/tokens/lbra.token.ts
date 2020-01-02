import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class LBraToken extends Token<void> {
    constructor() {
        super(ETokenType.LBRA);
    }
}
