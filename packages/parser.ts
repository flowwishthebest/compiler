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
