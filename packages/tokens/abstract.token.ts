import { ETokenType, IToken } from './token.interface';

export abstract class Token<Type> implements IToken<Type> {
    constructor(
        private readonly type: ETokenType,
        private readonly value: Type,
    ) {}

    public getType(): ETokenType {
        return this.type;
    }

    public getValue(): Type {
        return this.value;
    }
}
