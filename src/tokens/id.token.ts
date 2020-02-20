import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class IdToken extends Token<string> {
    constructor(value: string) {
        super(ETokenType.ID, value);
    }
}
