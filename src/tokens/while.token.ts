import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class WhileToken extends Token<void> {
    constructor(lineNo?: number, colNo?: number) {
        super(ETokenType.WHILE, undefined, lineNo, colNo);
    }
}
