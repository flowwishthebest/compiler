import { BuiltinTypeSymbol } from './builtin-type.symbol';

export abstract class MySymbol {
    constructor(
        private readonly _name: string,
        private readonly _type?: BuiltinTypeSymbol,
    ) {}

    public getName(): string {
        return this._name;
    }

    public getType(): BuiltinTypeSymbol | null {
        return this._type || null;
    }
}