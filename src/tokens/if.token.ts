import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class IfToken extends Token<void> {
    constructor() {
        super(ETokenType.IF);
    }
}
