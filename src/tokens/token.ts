import { ETokenType } from '../types/token.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Token<T = any> {

    constructor(
        private readonly _type: ETokenType,
        private readonly _value?: T,
    ) {}

    public getType(): ETokenType {
        return this._type;
    }

    public getValue(): T {
        return this._value;
    }
}
