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
import { IfToken } from './tokens/if.token';
import { ElseToken } from './tokens/else.token';
import { WhileToken } from './tokens/while.token';
import { AndToken } from './tokens/and.token';
import { OrToken } from './tokens/or.token';
import { NilToken } from './tokens/nil.token';
import { FalseToken } from './tokens/false.token';
import { TrueToken } from './tokens/true.token';
import { BangEqualToken } from './tokens/bang-equal.token';
import { BangToken } from './tokens/bang.token';
import { EqualEqualToken } from './tokens/equal-equal.token';
import { EqualToken } from './tokens/equal.token';
import { LessEqualToken } from './tokens/less-equal.token';
import { LessToken } from './tokens/less.token';
import { GreaterEqualToken } from './tokens/greater-equal.token';
import { GreaterToken } from './tokens/greater.token';
import { PrintToken } from './tokens/print.token';
import { AmpersandToken } from './tokens/ampersand.token';
import { BarToken } from './tokens/bar.token';
import { CaretToken } from './tokens/caret.token';
import { OpenBracketToken } from './tokens/open-bracket.token';
import { ClosedBracketToken } from './tokens/closed-bracket.token';

function isDigit(char: string): boolean {
    return '0' <= char && char <= '9';
}

function isAlpha(char: string): boolean {
    return (char >= 'a' && char <= 'z') ||
            (char >= 'A' && char <= 'Z') ||
            char == '_';
}

function isAlphaNumeric(char: string): boolean {
    return isAlpha(char) || isDigit(char);
}

function isWhitespace(char: string): boolean {
    return char === ' ' || char === '\n';
}

const PLUS = '+';
const SLASH = '/';
const MINUS = '-';
const STAR = '*';
const LPAREN = '(';
const RPAREN = ')';
const LBRACKET = '{';
const RBRACKET = '}';
const SEMICOLON = ';';
const DOT = '.';
const COLON = ':';
const COMMA = ',';
const EQUAL = '=';
const NEWLINE = '\n';
const BANG = '!';
const LESS = '<';
const GREATER = '>';
const AMPERSAND = '&';
const BAR = '|';
const CARET = '^';
const OPEN_BRACKET = '[';
const CLOSED_BRACKET = ']';

export class Tokenizer {
    private readonly _keywords: Map<string, Token>;

    private _position = 0;
    private _char: string;

    private _lineNo = 1;
    private _columnNo = 1;

    constructor(private readonly _code: string) {
        this._char = this._code.charAt(this._position);

        const keywords = new Map<string, Token>();

        keywords.set('integer', new IntegerTypeToken());
        keywords.set('float', new FloatTypeToken());
        keywords.set('div', new IntegerDivToken());
        keywords.set('var', new VarToken());
        keywords.set('program', new ProgramToken());
        keywords.set('procedure', new ProcedureToken());
        keywords.set('if', new IfToken());
        keywords.set('else', new ElseToken());
        keywords.set('while', new WhileToken());
        keywords.set('and', new AndToken());
        keywords.set('or', new OrToken());
        keywords.set('nil', new NilToken());
        keywords.set('false', new FalseToken());
        keywords.set('true', new TrueToken());
        keywords.set('print', new PrintToken());

        this._keywords = keywords;
    }

    public getNextToken(): Token {
        while (this._char) {

            if (isWhitespace(this._peek())) {
                this._advance();
                continue;
            }

            const c = this._peek();

            switch (c) {
                case SLASH: {
                    if (this._lookahead() === SLASH) {
                        this._advance(); this._advance();

                        this._skipComments();
                        continue;
                    } else {
                        this._advance();
                        return new FloatDivToken();
                    }
                }
                case COLON: {
                    if (this._lookahead() === EQUAL) {
                        this._advance(); this._advance();
                        return new AssignToken();
                    } else {
                        this._advance();
                        return new ColonToken();
                    }
                }
                case BANG: {
                    if (this._lookahead() === EQUAL) {
                        this._advance(); this._advance();
                        return new BangEqualToken();
                    } else {
                        this._advance();
                        return new BangToken();
                    }
                }
                case EQUAL: {
                    if (this._lookahead() === EQUAL) {
                        this._advance(); this._advance();
                        return new EqualEqualToken();
                    } else {
                        this._advance();
                        return new EqualToken();
                    }
                }
                case LESS: {
                    if (this._lookahead() === EQUAL) {
                        this._advance(); this._advance();
                        return new LessEqualToken();
                    } else {
                        this._advance();
                        return new LessToken();
                    }
                }
                case GREATER: {
                    if (this._lookahead() === EQUAL) {
                        this._advance(); this._advance();
                        return new GreaterEqualToken();
                    } else {
                        this._advance();
                        return new GreaterToken();
                    }
                }
                case COMMA: {
                    this._advance();
                    return new CommaToken();
                }
                case PLUS: {
                    this._advance();
                    return new PlusToken();
                }
                case MINUS: {
                    this._advance();
                    return new MinusToken();
                }
                case STAR: {
                    this._advance();
                    return new MulToken();
                }
                case LPAREN: {
                    this._advance();
                    return new LParenToken();
                }
                case RPAREN: {
                    this._advance();
                    return new RParenToken();
                }
                case RBRACKET: {
                    this._advance();
                    return new RBracketToken();
                }
                case LBRACKET: {
                    this._advance();
                    return new LBracketToken();
                }
                case SEMICOLON: {
                    this._advance();
                    return new SemicolonToken();
                }
                case AMPERSAND: {
                    this._advance();
                    return new AmpersandToken();
                }
                case BAR: {
                    this._advance();
                    return new BarToken();
                }
                case CARET: {
                    this._advance();
                    return new CaretToken();
                }
                case OPEN_BRACKET: {
                    this._advance();
                    return new OpenBracketToken();
                }
                case CLOSED_BRACKET: {
                    this._advance();
                    return new ClosedBracketToken();
                }
                default: {
                    if (isDigit(c)) {
                        return this._number();
                    } else if (isAlpha(c)) {
                        return this._identifier();
                    } else {
                        const msg = (
                            `Lexer error on ${this._peek()} ` +
                            `line: ${this._lineNo} ` +
                            `column: ${this._columnNo}`
                        );
    
                        throw new TokenizerError(msg);
                    }
                }
            }
        }

        return new EOFToken();
    }

    public getCurrentChar(): string {
        return this._peek();
    }

    private _number(): IntegerConstToken | FloatConstToken {
        const num = [];

        while (isDigit(this._peek())) {
            num.push(this._peek());
            this._advance();
        }

        if (this._peek() === DOT) {
            num.push(DOT);
            this._advance();

            while(isDigit(this._peek())) {
                num.push(this._peek());
                this._advance();
            }

            const f = parseFloat(num.join(''));

            return new FloatConstToken(f);
        }

        const i = parseInt(num.join(''));

        return new IntegerConstToken(i);
    }

    private _identifier(): IdToken {
        const identifier = [];

        while (this._peek() && isAlphaNumeric(this._peek())) {
            identifier.push(this._peek());
            this._advance();
        }

        const id = identifier.join('');

        return this._keywords.get(id) ||
            new IdToken(id, this._lineNo, this._columnNo);
    }

    private _advance(): void {
        if (this._peek() === NEWLINE) {
            this._lineNo += 1;
            this._columnNo = 0;
        }

        this._position += 1;
        this._char = this._code.charAt(this._position);
        this._columnNo += 1;
    }
    
    private _lookahead(): string {
        return this._code.charAt(this._position + 1);
    }

    private _skipComments(): void {
        while(this._peek() && this._peek() !== NEWLINE) {
            this._advance();
        }

        this._advance(); // skip new line
    }

    private _peek(): string {
        return this._code.charAt(this._position);
    }
}
