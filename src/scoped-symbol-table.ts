import { MySymbol } from "./symbols/my.symbol";
import { BuiltinTypeSymbol } from "./symbols/builtin-type.symbol";

interface Options {
    trace?: boolean;
    logger?: any;
}

interface KwArgs {
    scopeName: string;
    scopeLevel: number;
    enclosingScope?: ScopedSymbolTable;
    initBuiltins?: boolean;
}

export class ScopedSymbolTable {
    private readonly _symbols: Map<string, MySymbol>;

    private readonly _scopeName: string;
    private readonly _scopeLevel: number;
    private readonly _enclosingScope: ScopedSymbolTable;

    constructor(
        kwArgs: KwArgs,
        private readonly _options: Options = { trace: true },
    ) {
        this._symbols = new Map();
        this._scopeName = kwArgs.scopeName;
        this._scopeLevel = kwArgs.scopeLevel;
        this._enclosingScope = kwArgs.enclosingScope;
        
        if (kwArgs.initBuiltins) {
            this._initBuiltins();
        }
    }

    public getScopeName(): string {
        return this._scopeName;
    }

    public getEnclosingScope(): ScopedSymbolTable | null {
        return this._enclosingScope || null;
    }

    public getScopeLevel(): number {
        return this._scopeLevel;
    }

    public print(): void {
        const h1 = 'SCOPE (SCOPED SYMBOL TABLE)';
        const delimeter = '='.repeat(h1.length);
        const scopeName = `Scope name: ${this._scopeName}`;
        const scopeLevel = `Scope level: ${this._scopeLevel}`;
        const enclosingScopeName = (
            this._enclosingScope && this._enclosingScope.getScopeName()
        );
        const enclosingScope = `Enclosing scope: ${enclosingScopeName || null}`;

        const msg = [
            '',
            '',
            h1,
            delimeter,
            scopeName,
            scopeLevel,
            enclosingScope,
            '-'.repeat(h1.length),
        ];

        console.log(msg.join('\n'));

        for (const sym of this._symbols.values()) {
            const name = sym.getName();
            const type = sym.getType() && sym.getType().getName();

            const constName = sym.constructor.name;
            console.log(`${constName}(${name}` + (type ? (`, ${type})`) : ')'));
        }
        console.log('\n');
    }

    public define(symbol: MySymbol): this {
        if (this._options.trace) {
            console.log('Define: ' + symbol.getName());
        }
        this._symbols.set(symbol.getName(), symbol);
        return this;
    }

    public lookup(name: string): MySymbol | null {
        if (this._options.trace) {
            console.log(`Lookup: ${name}, (Scope name: ${this.getScopeName()})`);
        }

        if (this._symbols.has(name)) {
            return this._symbols.get(name);
        } else {
            if (this.getEnclosingScope()) {
                return this.getEnclosingScope().lookup(name);
            }
        }

        return null;
    }

    private _initBuiltins(): void {
        this.define(new BuiltinTypeSymbol('integer'));
        this.define(new BuiltinTypeSymbol('float'));
    }
}
