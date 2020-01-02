import { IScanner } from './scanner.interface';
import { TokenFactory } from './tokens/token.factory';
import { IToken } from './tokens/token.interface';

export class Scanner implements IScanner {
    private readonly keywords: Map<string, string>;
    private readonly symbols: Map<string, string>;
    private readonly tokenFactory: TokenFactory = new TokenFactory();

    private currentChar: string;
    private src: string;

    constructor(sourceCode: string) {
        this.src = sourceCode;
        this.currentChar = this.src.charAt(0);

        this.keywords = new Map();

        this.keywords
            .set('if', 'if')
            .set('else', 'else')
            .set('do', 'do')
            .set('while', 'while')
            .set('true', 'true')
            .set('false', 'false');

        this.symbols = new Map();

        this.symbols
            .set('{', '{')
            .set('}', '}')
            .set(';', ';')
            .set('(', '(')
            .set(')', ')')
            .set('+', '+')
            .set('-', '-')
            .set('<', '<')
            .set('=', '=')
            .set('*', '*')
            .set('/', '/');
    }

    public * getTokensLazy(): Generator<IToken> {
        while (this.src.length) {
            if (!this.currentChar.length) {
                yield this.tokenFactory.createEof();

            } else if (this._isSpace(this.currentChar)) {
                this._getNextChar();
            } else if (this.symbols.has(this.currentChar)) {
                const symb = this.symbols.get(this.currentChar);

                yield this.tokenFactory.createSymbolToken(symb);
                this._getNextChar();
            } else if (this._isDigit(this.currentChar)) {
                let intValue = 0;

                while (this._isDigit(this.currentChar)) {
                    intValue = intValue * 10 + parseInt(this.currentChar, 10);
                    this._getNextChar();
                }

                yield this.tokenFactory.createNum(intValue);
            } else if (this._isAplha(this.currentChar)) {
                let ident = '';

                while (this._isAplha(this.currentChar)) {
                    ident = ident + this.currentChar.toLowerCase();

                    this._getNextChar();
                }

                if (this.keywords.has(ident)) {
                    const kw = this.keywords.get(ident);
                    yield this.tokenFactory.createKeywordToken(kw);
                } else if (ident.length >= 1) {
                    yield this.tokenFactory.createIdent(ident);
                } else {
                    throw new Error(`Unknown identifier: ${ident}`);
                }
            } else {
                throw new Error(`Unexpected token ${this.currentChar}`);
            }
        }

        yield this.tokenFactory.createEof();
    }

    private _getNextChar(): void {
        this.src = this.src.slice(1);
        this.currentChar = this.src.charAt(0);
    }

    private _isSpace(char: string): boolean {
        return char === ' ';
    }

    private _isDigit(char: string): boolean {
        return '0' <= char && char <= '9';
    }

    private _isAplha(char: string): boolean {
        return 'a' <= char && char <= 'z' || 'A' <= char && char <= 'Z';
    }
}
