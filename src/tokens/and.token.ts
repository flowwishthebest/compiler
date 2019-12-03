import { Token } from './token';
import { ETokenType, IToken } from './token.interface';

export class And extends Token implements IToken {
    constructor() {
        super(ETokenType.AND, null);
    }
}
