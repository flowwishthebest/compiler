import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class EofToken extends Token<void> {
    constructor() {
        super(ETokenType.EOF);
    }
}
