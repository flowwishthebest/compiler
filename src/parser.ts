import { Tokenizer } from './tokenizer';
import { DivToken } from './tokens/div.token';
import { MinusToken } from './tokens/minus.token';
import { MulToken } from './tokens/mul.token';
import { PlusToken } from './tokens/plus.token';
import { Token } from './tokens/token';
import { ETokenType } from './types/token.type';

export class Parser {
    // @Parser = [token, ..., token] -> ast

    private _currentToken: Token;

    constructor(private readonly _tokenizer: Tokenizer) {}

    public parse(): number {
        return this._expr();
    }

    private _expr(): number { // term ((PLUS | MINUS) term)*
        if (!this._currentToken) {
            this._setNext();
        }

        let result = this._term();

        while (
            this._currentToken instanceof MinusToken ||
            this._currentToken instanceof PlusToken
        ) {
            if (this._currentToken instanceof PlusToken) {
                this._setNext();
                result += this._term();
            } else if (this._currentToken instanceof MinusToken) {
                this._setNext();
                result -= this._term();
            }
        }

        return result;
    }

    private _factor(): number { // factor : INTEGER | LPAREN expr RPAREN

        const tokenType = this._currentToken.getType();

        if (tokenType === ETokenType.NUMBER) {
            const value = this._currentToken.getValue();

            this._setNext();

            return value;
        }

        if (tokenType === ETokenType.LPAREN) {
            this._setNext(); // remove lparen

            const result = this._expr();

            this._setNext(); // remove rparen

            return result;
        }

        throw new Error(
            `Syntax error. Factor method got execp token ${this._currentToken}`
        );
    }

    private _term(): number { // factor ((MUL | DIV) factor)*

        let result = this._factor();

        while (
            this._currentToken instanceof DivToken ||
            this._currentToken instanceof MulToken
        ) {
            if (this._currentToken instanceof DivToken) {
                this._setNext();
                result /= this._factor();
            } else if (this._currentToken instanceof MulToken) {
                this._setNext();
                result *= this._factor();
            }
        }

        return result;
    }

    private _setNext(): void {
        this._currentToken = this._tokenizer.getNextToken();
    }
}
