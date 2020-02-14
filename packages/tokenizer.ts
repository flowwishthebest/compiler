import { DivToken } from './tokens/div.token';
import { EOFToken } from './tokens/eof.token';
import { MinusToken } from './tokens/minus.token';
import { MulToken } from './tokens/mul.token';
import { NumberToken } from './tokens/number.token';
import { PlusToken } from './tokens/plus.token';
import { Token } from './tokens/token';

// @lexer = Source code to [token, ..., token]
export class Tokenizer {

    private _position: number = 0;
    private _currentChar: string;

    constructor(private readonly _sourceCode: string) {
        this._currentChar = this._sourceCode[this._position];
    }

    public getNextToken(): Token {

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

                return new NumberToken(parseFloat(interger.join('')));
            }

            if (this._currentChar === '+') {
                this._toNextChar();
                return new PlusToken();
            }

            if (this._currentChar === '-') {
                this._toNextChar();
                return new MinusToken();
            }

            if (this._currentChar === '*') {
                this._toNextChar();
                return new MulToken();
            }

            if (this._currentChar === '/') {
                this._toNextChar();
                return new DivToken();
            }

            throw new Error('Unsupported token type ' + this._currentChar);
        }

        return new EOFToken();
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
