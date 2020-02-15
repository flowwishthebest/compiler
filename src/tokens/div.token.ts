import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class DivToken extends Token<void> {
    constructor() {
        super(ETokenType.DIV);
    }
}
