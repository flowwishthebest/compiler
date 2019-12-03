import { Token } from './token';
import { ETokenType, IToken } from './token.interface';

export class Id extends Token implements IToken {
    constructor(id: string) {
        super(ETokenType.ID, id);
    }
}
