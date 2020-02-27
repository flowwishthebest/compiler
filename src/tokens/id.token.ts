import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class IdToken extends Token<string> {
    constructor(value: string, lineNo: number, columnNo: number) {
        super(ETokenType.ID, value, lineNo, columnNo);
    }
}
