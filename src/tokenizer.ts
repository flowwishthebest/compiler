import {
    PlusToken,
    RParenToken,
    NumberToken,
    MulToken,
    MinusToken,
    LParenToken,
    EOFToken,
    DivToken,
} from './tokens';
import { Token } from './tokens/token';
import { RBracketToken } from './tokens/rbracket.token';
import { LBracketToken } from './tokens/lbracket.token';
import { IdToken } from './tokens/id.token';
import { AssignToken } from './tokens/assign.token';
import { SemicolonToken } from './tokens/semicolon.token';

function isDigit(char: string): boolean {
    return '0' <= char && char <= '9';
}

function isWhiteSpace(char: string): boolean {
    return char === ' ';
}

function isAlphaNum(char: string): boolean {
    return /^[a-z0-9]+$/i.test(char);
}

const PLUS_SIGN = '+';
const DIV_SIGN = '/';
const MINUS_SIGN = '-';
const MUL_SIGN = '*';
const LPAREN_SIGN = '(';
const RPAREN_SIGN = ')';
const LBRACKET_SIGN = '{';
const RBRACKET_SIGN = '}';
const SEMICOLON_SIGN = ';';

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
                return this._number();
            }

            if (isAlphaNum(this._currentChar)) {
                return this._identifier();
            }

            if (this._currentChar === ':' && this._peek() === '=') {
                this._toNextChar();
                this._toNextChar();
                return new AssignToken();
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
                case RBRACKET_SIGN: {
                    this._toNextChar();
                    return new RBracketToken();
                }
                case LBRACKET_SIGN: {
                    this._toNextChar();
                    return new LBracketToken();
                }
                case SEMICOLON_SIGN: {
                    this._toNextChar();
                    return new SemicolonToken();
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

    private _number(): NumberToken {
        const interger = [];

        while (this._currentChar && isDigit(this._currentChar)) {
            interger.push(this._currentChar);
            this._toNextChar();
        }

        const i = parseFloat(interger.join(''));

        return new NumberToken(i);
    }

    private _identifier(): IdToken {
        const identifier = [];

        while (this._currentChar && isAlphaNum(this._currentChar)) {
            identifier.push(this._currentChar);
            this._toNextChar();
        }

        const i = identifier.join('');

        return new IdToken(i);
    }

    private _toNextChar(): void {
        this._position += 1;
        this._currentChar = this._sourceCode.charAt(this._position);
    }
    
    private _peek(): string {
        return this._sourceCode.charAt(this._position + 1);
    }
}
