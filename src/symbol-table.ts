import { MySymbol, BuiltinTypeSymbol } from "./symbols"

export class SymbolTable {
    private readonly _symbols: Map<string, MySymbol>;

    constructor(
        private readonly _kwArgs: { trace: boolean } = { trace: true },
    ) {
        this._symbols = new Map();
        this._initBuiltins();
    }

    public print(): void {
        for (const sym of this._symbols.values()) {
            const name = sym.getName();
            const type = sym.getType();

            let typeName = null;
            if (type) {
                typeName = type.getName();
            }

            const constName = sym.constructor.name;
            console.log(`${constName}(${name}` + (typeName ? (', ' + typeName + ')') : ')'));
        }
    }

    public define(symbol: MySymbol): this {
        if (this._kwArgs.trace) {
            console.log('Define: ' + symbol.getName());
        }
        this._symbols.set(symbol.getName(), symbol);
        return this;
    }

    public lookup(name: string): MySymbol | null {
        if (this._kwArgs.trace) {
            console.log(`Lookup: ${name}`);
        }
        return this._symbols.has(name) ? this._symbols.get(name) : null;
    }

    private _initBuiltins(): void {
        this.define(new BuiltinTypeSymbol('integer'));
        this.define(new BuiltinTypeSymbol('float'));
    }
}
