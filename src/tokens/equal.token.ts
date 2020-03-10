import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class EqualToken extends Token<void> {
    constructor() {
        super(ETokenType.EQUAL);
    }
}
