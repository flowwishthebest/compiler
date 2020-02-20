import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class ProgramToken extends Token<void> {
    constructor() {
        super(ETokenType.PROGRAM);
    }
}
