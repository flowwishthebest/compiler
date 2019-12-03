import { ETokenType, IToken } from './token.interface';

export abstract class Token implements IToken {
    constructor(
        public readonly type: ETokenType,
        public readonly value: any,
    ) {}
}
