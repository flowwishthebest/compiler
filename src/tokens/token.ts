import { ETokenType } from '../types/token.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Token<T = any> {

    constructor(
        private readonly _type: ETokenType,
        private readonly _value?: T,
        private _lineNo?: number,
        private _columnNo?: number,
    ) {}

    public getType(): ETokenType {
        return this._type;
    }

    public getValue(): T {
        return this._value;
    }

    public setColumnNo(n: number): this {
        this._columnNo = n;
        return this;
    }

    public setLineNo(n: number): this {
        this._lineNo = n;
        return this;
    }

    public toString(): string {
        return (
            `${this.constructor.name}` +
            `(${this._type}, ${this._value}, ` +
            `position=${this._lineNo}:${this._columnNo})`
        );
    }
}
