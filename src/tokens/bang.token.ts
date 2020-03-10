import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class BangToken extends Token<void> {
    constructor() {
        super(ETokenType.BANG);
    }
}
