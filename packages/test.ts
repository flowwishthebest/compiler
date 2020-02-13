// tslint:disable

enum ETokenType {
    EOF = 'EOF',
    NUMBER = 'NUMBER',
    PLUS = 'PLUS',
    MINUS = 'MINUS',
}

class Token {
    constructor(
        public readonly type: ETokenType,
        public readonly value?: any,
    ) {}
}

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
                // skip

                while (this._currentChar && this._isWhiteSpace(this._currentChar)) {
                    this._toNextChar();
                }
                
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
        return '0' <= char && char <= '9' 
    }

    private _toNextChar(): void {
        this._position += 1;
        this._currentChar = this._sourceCode[this._position];
    }
}

export class Parser {
    // @Parser = [token, ..., token] -> ast

    private _currentToken: Token;

    constructor(
        private readonly _tokenizer: Tokenizer,
    ) {
        this._currentToken = _tokenizer.getNextToken();
    }

    public parse(): any {
        const left = this._currentToken;

        this._currentToken = this._tokenizer.getNextToken();

        const op = this._currentToken;

        this._currentToken = this._tokenizer.getNextToken();

        const right = this._currentToken;

        this._currentToken = this._tokenizer.getNextToken();

        if (this._currentToken.type === ETokenType.EOF) {
            if (op.type === ETokenType.PLUS) {
                return left.value + right.value;
            }
            
            if (op.type === ETokenType.MINUS) {
                return left.value - right.value;
            }
        } else {
            throw new Error('Too much operands');
        }
    }
}