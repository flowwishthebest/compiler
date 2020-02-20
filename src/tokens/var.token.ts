import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class VarToken extends Token<void> {
    constructor() {
        super(ETokenType.VAR);
    }
}
