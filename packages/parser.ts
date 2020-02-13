import { ETokenType, Token } from './token';
import { Tokenizer } from './tokenizer';

export class Parser {
    // @Parser = [token, ..., token] -> ast

    private _currentToken: Token;

    constructor(
        private readonly _tokenizer: Tokenizer,
    ) {
        this._currentToken = _tokenizer.getNextToken();
    }

    public parse(): any {

        let result = this._currentToken.value;

        this._currentToken = this._tokenizer.getNextToken();

        while (
            this._currentToken.type === ETokenType.MINUS
            || this._currentToken.type === ETokenType.PLUS
        ) {
            const op = this._currentToken;

            if (op.type === ETokenType.PLUS) {
                this._currentToken = this._tokenizer.getNextToken();

                result += this._currentToken.value;

                this._currentToken = this._tokenizer.getNextToken();
            } else if (op.type === ETokenType.MINUS) {
                this._currentToken = this._tokenizer.getNextToken();

                result -= this._currentToken.value;

                this._currentToken = this._tokenizer.getNextToken();
            }
        }

        return result;
    }
}
