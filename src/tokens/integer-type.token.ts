import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class IntegerTypeToken extends Token<string> {
    constructor() {
        super(ETokenType.INTEGER, 'integer');
    }
}
