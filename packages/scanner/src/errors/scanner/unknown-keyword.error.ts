import { ScannerError } from './scanner.error';

export class UnknownKeywordError extends ScannerError {
    constructor(keyword: string) {
        super('Unknown keyword: ' + keyword);
    }
}
