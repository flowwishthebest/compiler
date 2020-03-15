import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class FuncToken extends Token<void> {
    constructor() {
        super(ETokenType.FUNC);
    }
}
