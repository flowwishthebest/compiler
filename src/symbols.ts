export class MySymbol {
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

export class BuiltinTypeSymbol extends MySymbol {
    constructor(name: string) {
        super(name);
    }
}

export class VariableSymbol extends MySymbol {
    constructor(name: string, type: BuiltinTypeSymbol) {
        super(name, type);
    } 
}


const intType = new BuiltinTypeSymbol('integer');

const myVariable = new VariableSymbol('a', intType);