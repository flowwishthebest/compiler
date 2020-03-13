import { ETokenType } from '../types/token.type';
import { Token } from './token';

export class BarToken extends Token<void> {
    constructor() {
        super(ETokenType.BAR);
    }
}
