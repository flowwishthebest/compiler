import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class LessToken extends Token<void> {
    constructor() {
        super(ETokenType.LESS);
    }
}
