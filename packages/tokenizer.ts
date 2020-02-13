import { ETokenType, Token } from './token';

export class Tokenizer {
    // @lexer = Source code to [token, ..., token]

    private _position: number = 0;
    private _currentChar: string;

    constructor(
        private readonly _sourceCode: string,
    ) {
        this._currentChar = this._sourceCode[this._position];
    }

    public getNextToken(): Token {
        // "1 + 2"

        while (this._currentChar) {

            if (this._isWhiteSpace(this._currentChar)) {
                this._skipWhiteSpaces();
                continue;
            }

            if (this._isDigit(this._currentChar)) {
                const interger = [];

                while (this._currentChar && this._isDigit(this._currentChar)) {
                    interger.push(this._currentChar);

                    this._toNextChar();
                }

                return new Token(ETokenType.NUMBER, parseFloat(interger.join('')));
            }

            if (this._currentChar === '+') {
                this._toNextChar();
                return new Token(ETokenType.PLUS);
            }

            if (this._currentChar === '-') {
                this._toNextChar();
                return new Token(ETokenType.MINUS);
            }

            throw new Error('Unsupported token type ' + this._currentChar);
        }

        return new Token(ETokenType.EOF);
    }

    private _isWhiteSpace(char: string): boolean {
        return char === ' ';
    }

    private _isDigit(char: string): boolean {
        return '0' <= char && char <= '9';
    }

    private _skipWhiteSpaces(): void {
        while (this._currentChar && this._isWhiteSpace(this._currentChar)) {
            this._toNextChar();
        }
    }

    private _toNextChar(): void {
        this._position += 1;
        this._currentChar = this._sourceCode[this._position];
    }
}
