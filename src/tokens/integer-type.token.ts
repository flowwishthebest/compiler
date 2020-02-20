import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class IntegerTypeToken extends Token<void> {
    constructor() {
        super(ETokenType.INTEGER);
    }
}
