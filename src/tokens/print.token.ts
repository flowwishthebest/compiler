import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class PrintToken extends Token<void> {
    constructor() {
        super(ETokenType.PRINT);
    }
}
