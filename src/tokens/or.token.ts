import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class OrToken extends Token<void> {
    constructor() {
        super(ETokenType.OR);
    }
}
