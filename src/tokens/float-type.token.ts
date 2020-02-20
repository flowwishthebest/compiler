import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class FloatTypeToken extends Token<void> {
    constructor() {
        super(ETokenType.FLOAT);
    }
}
