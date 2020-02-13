export class ScannerError extends Error {
    constructor(message?: string) {
        super(message || 'Generic scanner error');
    }
}
