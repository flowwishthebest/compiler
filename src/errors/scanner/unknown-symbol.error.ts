import { ScannerError } from './scanner.error';

export class UnknownSymbolError extends ScannerError {
    constructor(symbol: string) {
        super('Unknown symbol: ' + symbol);
    }
}
