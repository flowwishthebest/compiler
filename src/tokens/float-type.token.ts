import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class FloatTypeToken extends Token<string> {
    constructor() {
        super(ETokenType.FLOAT, 'float');
    }
}
