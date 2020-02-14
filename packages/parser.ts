import { Tokenizer } from './tokenizer';
import { MinusToken } from './tokens/minus.token';
import { NumberToken } from './tokens/number.token';
import { PlusToken } from './tokens/plus.token';
import { Token } from './tokens/token';

export class Parser {
    // @Parser = [token, ..., token] -> ast

    private _currentToken: Token;

    constructor(
        private readonly _tokenizer: Tokenizer,
    ) {
        this._currentToken = _tokenizer.getNextToken();
    }

    public parse(): any {

        let result = this._currentToken.getValue();

        this._currentToken = this._tokenizer.getNextToken();

        while (this._currentToken instanceof MinusToken
            || this._currentToken instanceof PlusToken
        ) {
            const op = this._currentToken;

            if (op instanceof PlusToken) {
                this._currentToken = this._tokenizer.getNextToken();

                if (this._currentToken instanceof NumberToken) {
                    result += this._currentToken.getValue();
                }

                this._currentToken = this._tokenizer.getNextToken();
            } else if (op instanceof MinusToken) {
                this._currentToken = this._tokenizer.getNextToken();

                if (this._currentToken instanceof NumberToken) {
                    result -= this._currentToken.getValue();
                }

                this._currentToken = this._tokenizer.getNextToken();
            }
        }

        return result;
    }
}
