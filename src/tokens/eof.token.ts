import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class EOFToken extends Token<void> {
    constructor() {
        super(ETokenType.EOF);
    }
}
