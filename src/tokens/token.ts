import { ETokenType } from '../types/token.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Token<T = any> {

    constructor(
        private readonly _type: ETokenType,
        private readonly _value?: T,
        private readonly _lineNo?: number,
        private readonly _columnNo?: number,
    ) {}

    public getType(): ETokenType {
        return this._type;
    }

    public getValue(): T {
        return this._value;
    }

    public toString(): string {
        return (
            `${this.constructor.name}` +
            `(${this._type}, ${this._value}, ` +
            `position=${this._lineNo}:${this._columnNo})`
        );
    }
}
