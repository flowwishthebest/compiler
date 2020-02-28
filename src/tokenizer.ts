import {
    PlusToken,
    RParenToken,
    MulToken,
    MinusToken,
    LParenToken,
    EOFToken,
    FloatDivToken,
} from './tokens';
import { Token } from './tokens/token';
import { RBracketToken } from './tokens/rbracket.token';
import { LBracketToken } from './tokens/lbracket.token';
import { IdToken } from './tokens/id.token';
import { AssignToken } from './tokens/assign.token';
import { SemicolonToken } from './tokens/semicolon.token';
import { IntegerTypeToken } from './tokens/integer-type.token';
import { FloatTypeToken } from './tokens/float-type.token';
import { IntegerDivToken } from './tokens/integer-div.token';
import { IntegerConstToken } from './tokens/integer-const.token';
import { FloatConstToken } from './tokens/float-const.token';
import { ColonToken } from './tokens/colon.token';
import { CommaToken } from './tokens/comma.token';
import { VarToken } from './tokens/var.token';
import { ProgramToken } from './tokens/program.token';
import { ProcedureToken } from './tokens/procedure.token';
import { TokenizerError } from './errors/tokenizer.error';

function isDigit(char: string): boolean {
    return '0' <= char && char <= '9';
}

function isWhiteSpace(char: string): boolean {
    // 10 -- new line, 32 -- space
    const code = char.charCodeAt(0);
    return code === 32 || code === 10;
}

function isAlphaNum(char: string): boolean {
    return /^[a-z0-9]+$/i.test(char);
}

const PLUS_SIGN = '+';
const FLOAT_DIV_SIGN = '/';
const MINUS_SIGN = '-';
const MUL_SIGN = '*';
const LPAREN_SIGN = '(';
const RPAREN_SIGN = ')';
const LBRACKET_SIGN = '{';
const RBRACKET_SIGN = '}';
const SEMICOLON_SIGN = ';';
const DOT_SIGN = '.';
const COLON_SIGN = ':';
const COMMA_SIGN = ',';

// @lexer = Source code to [token, ..., token]
export class Tokenizer {
    private readonly RESERVED_KEYWORDS: Map<string, Token>;

    private _position = 0;
    private _currentChar: string;

    private _lineNo = 1;
    private _columnNo = 1;

    constructor(private readonly _sourceCode: string) {
        this._currentChar = this._sourceCode.charAt(this._position);

        this.RESERVED_KEYWORDS = new Map<string, Token>();
        this.RESERVED_KEYWORDS
            .set('integer', new IntegerTypeToken())
            .set('float', new FloatTypeToken())
            .set('div', new IntegerDivToken())
            .set('var', new VarToken())
            .set('program', new ProgramToken())
            .set('procedure', new ProcedureToken());
    }

    public getNextToken(): Token {
        while (this._currentChar) {

            if (isWhiteSpace(this._currentChar)) {
                this._toNextChar();
                continue;
            }

            if (this._currentChar === '/' && this._peek() === '/') {
                this._toNextChar();
                this._toNextChar();
                this._skipComments();
                continue;
            }

            if (isDigit(this._currentChar)) {
                // TODO: 123 || .123 eq 0.123
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
                case COLON_SIGN: {
                    this._toNextChar();
                    return new ColonToken();
                }
                case COMMA_SIGN: {
                    this._toNextChar();
                    return new CommaToken();
                }
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
                case FLOAT_DIV_SIGN: {
                    this._toNextChar();
                    return new FloatDivToken();
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
                    const msg = (
                        `Lexer error on ${this._currentChar} ` +
                        `line: ${this._lineNo} ` +
                        `column: ${this._columnNo}`
                    );

                    throw new TokenizerError(msg);
                }
            }
        }

        return new EOFToken();
    }

    public getCurrentChar(): string {
        return this._currentChar;
    }

    private _number(): IntegerConstToken | FloatConstToken {
        const num = [];

        while (this._currentChar && isDigit(this._currentChar)) {
            num.push(this._currentChar);
            this._toNextChar();
        }

        if (this._currentChar === DOT_SIGN) {
            num.push(DOT_SIGN);

            this._toNextChar();

            while(this._currentChar && isDigit(this._currentChar)) {
                num.push(this._currentChar);
                this._toNextChar();
            }

            const f = parseFloat(num.join(''));

            return new FloatConstToken(f);
        }

        const i = parseInt(num.join(''));

        return new IntegerConstToken(i);
    }

    private _identifier(): IdToken {
        const identifier = [];

        while (this._currentChar && isAlphaNum(this._currentChar)) {
            identifier.push(this._currentChar);
            this._toNextChar();
        }

        const id = identifier.join('');

        return this.RESERVED_KEYWORDS.get(id) ||
            new IdToken(id, this._lineNo, this._columnNo);
    }

    private _toNextChar(): void {
        if (this._currentChar === '\n') {
            this._lineNo += 1;
            this._columnNo = 0;
        }

        this._position += 1;
        this._currentChar = this._sourceCode.charAt(this._position);

        this._columnNo += 1;
    }
    
    private _peek(): string {
        return this._sourceCode.charAt(this._position + 1);
    }

    private _skipComments(): void {
        while(this._currentChar && this._currentChar !== '\n') {
            this._toNextChar();
        }
        this._toNextChar(); // skip new line
    }
}
