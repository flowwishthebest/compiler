import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class ColonToken extends Token<void> {
    constructor() {
        super(ETokenType.COLON);
    }
}
