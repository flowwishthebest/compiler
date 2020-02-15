import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class PlusToken extends Token<void> {
    constructor() {
        super(ETokenType.PLUS);
    }
}
