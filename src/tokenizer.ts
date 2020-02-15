import { DivToken } from './tokens/div.token';
import { EOFToken } from './tokens/eof.token';
import { LParenToken } from './tokens/lparen.token';
import { MinusToken } from './tokens/minus.token';
import { MulToken } from './tokens/mul.token';
import { NumberToken } from './tokens/number.token';
import { PlusToken } from './tokens/plus.token';
import { RParenToken } from './tokens/rparen.token';
import { Token } from './tokens/token';

function isDigit(char: string): boolean {
    return '0' <= char && char <= '9';
}

function isWhiteSpace(char: string): boolean {
    return char === ' ';
}

const PLUS_SIGN = '+';
const DIV_SIGN = '/';
const MINUS_SIGN = '-';
const MUL_SIGN = '*';
const LPAREN_SIGN = '(';
const RPAREN_SIGN = ')';

// @lexer = Source code to [token, ..., token]
export class Tokenizer {
    private _position = 0;
    private _currentChar: string;

    constructor(private readonly _sourceCode: string) {
        this._currentChar = this._sourceCode.charAt(this._position);
    }

    public getNextToken(): Token {
        while (this._currentChar) {
            if (isWhiteSpace(this._currentChar)) {
                this._toNextChar();
                continue;
            }

            if (isDigit(this._currentChar)) {
                const interger = [];

                while (this._currentChar && isDigit(this._currentChar)) {
                    interger.push(this._currentChar);

                    this._toNextChar();
                }

                const i = parseFloat(interger.join(''));

                return new NumberToken(i);
            }

            switch (this._currentChar) {
                case PLUS_SIGN: {
                    this._toNextChar();
                    return new PlusToken();
                }
                case MINUS_SIGN: {
                    this._toNextChar();
                    return new MinusToken();
                }
                case MUL_SIGN: {
                    this._toNextChar();
                    return new MulToken();
                }
                case DIV_SIGN: {
                    this._toNextChar();
                    return new DivToken();
                }
                case LPAREN_SIGN: {
                    this._toNextChar();
                    return new LParenToken();
                }
                case RPAREN_SIGN: {
                    this._toNextChar();
                    return new RParenToken();
                }
                default: {
                    throw new Error(
                        `Unsupported token type ${this._currentChar}`
                    );
                }
            }
        }

        return new EOFToken();
    }

    private _toNextChar(): void {
        this._position += 1;
        this._currentChar = this._sourceCode.charAt(this._position);
    }
}
