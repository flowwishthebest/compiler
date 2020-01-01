import { Token } from './abstract.token';
import { ETokenType } from './token.interface';

export class IdentToken extends Token<string> {
    constructor(value: string) {
        super(ETokenType.ID, value);
    }
}
