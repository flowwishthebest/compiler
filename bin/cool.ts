/**
 * # bnf
 * 
 * program := declaration* EOF ;
 * 
 * declaration := 
 */

enum TokenType {
    MINUS,
}



class __Scanner {
    private __currentIndex: number;
    private __start: number;
    private __line: number;

    constructor(
        private readonly __source: string,
    ) {
        this.__currentIndex = 0;
        this.__start = 0;
        this.__line = 0;
    }

    private __isAtEnd(): boolean {
        return this.__currentIndex >= this.__source.length;
    }

    private __advance(): void {
        this.__currentIndex++;

    }

    private __isDigit(char: string): boolean {
        return char >= '0' && char <= '9';
    }

    private __handleNumber(): 
}

export interface Token<T = any> {
    type: TokenType;
    value?: T;
    lineNo?: number;
    columnNo?: number;
}

export class Scanner {
    private readonly _keywords: Map<string, Token>;

    private _position = 0;
    private _char: string;

    private _lineNo = 1;
    private _columnNo = 1;

    constructor(private readonly _code: string) {
        this._char = this._code.charAt(this._position);

        this._keywords = new Map<string, Token>();
        this._keywords.set('integer', new IntegerTypeToken())
            .set('float', new FloatTypeToken())
            .set('div', new IntegerDivToken())
            .set('var', new VarToken())
            .set('program', new ProgramToken())
            .set('procedure', new ProcedureToken())
            .set('if', new IfToken())
            .set('else', new ElseToken())
            .set('while', new WhileToken());
    }

    public * getTokensLazy(): Generator<Token> {
        const char;
        const position;
    }

    public getNextToken(): Token {
        while (this._isAtEnd()) {

            if (isWhiteSpace(this._currentChar)) {
                this._toNextChar();
                continue;
            }

            if (strictEqual(this._currentChar, SLASH) && strictEqual(this._peek(), SLASH)) {
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

    private _isAtEnd(): boolean {
        return this._position >= this._code.length;
    }
}
