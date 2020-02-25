import { BuiltinTypeSymbol } from './builtin-type.symbol';
import { MySymbol } from './my.symbol';

export class VariableSymbol extends MySymbol {
    constructor(name: string, type: BuiltinTypeSymbol) {
        super(name, type);
    } 
}
