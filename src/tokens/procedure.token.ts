import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class ProcedureToken extends Token<void> {
    constructor() {
        super(ETokenType.PROCEDURE);
    }
}
