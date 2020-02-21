import { MySymbol, BuiltinTypeSymbol, VariableSymbol } from "./symbols"
import { Tokenizer } from "./tokenizer";
import { Parser } from "./parser";
import { SymbolTableBuilder } from "./symbol-table-builder";

export class SymbolTable {
    private readonly _symbols: Map<string, MySymbol>;

    constructor() {
        this._symbols = new Map();
        this._initBuiltins();
    }

    public print(): void {
        console.log([...this._symbols.values()]);
    }

    public define(symbol: MySymbol): this {
        console.log('Define: ' + symbol.getName());
        this._symbols.set(symbol.getName(), symbol);
        return this;
    }

    public lookup(name: string): MySymbol | null {
        console.log('Lookup: ' + name);
        return this._symbols.has(name) ? this._symbols.get(name) : null;
    }

    private _initBuiltins(): void {
        // this.define(new BuiltinTypeSymbol('integer'));
        // this.define(new BuiltinTypeSymbol('float'));
    }
}

/**

 */

 const to = new Tokenizer(`
    program Part11; var x : integer; y : float; {}`);

const parser = new Parser(to);

const ast = parser.parse();

const build = new SymbolTableBuilder();

build.visit(ast);

//  const symbolTable = new SymbolTable();

//  const integerType = new BuiltinTypeSymbol('integer');

//  symbolTable.define(integerType);

//  symbolTable.print();

//  const variableX = new VariableSymbol('x', integerType);

//  symbolTable.define(variableX);

//  const floatType = new BuiltinTypeSymbol('float');

//  symbolTable.define(floatType);

//  symbolTable.print();

//  const variableY = new VariableSymbol('y', floatType);

//  symbolTable.define(variableY);

//  symbolTable.print();