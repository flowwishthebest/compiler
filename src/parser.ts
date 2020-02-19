import { Tokenizer } from './tokenizer';
import { DivToken } from './tokens/div.token';
import { MinusToken } from './tokens/minus.token';
import { MulToken } from './tokens/mul.token';
import { PlusToken } from './tokens/plus.token';
import { Token } from './tokens/token';
import { NumberToken } from './tokens/number.token';
import { LParenToken } from './tokens/lparen.token';
import { AST } from './ast/ast';
import { BinOpAST } from './ast/bin-op.ast';
import { NumberAST } from './ast/number.ast';
import { UnaryOpAST } from './ast/unary-op.ast';

export class Parser {
    // @Parser = [token, ..., token] -> ast

    private _currentToken: Token;

    constructor(private readonly _tokenizer: Tokenizer) {}

    public parse(): AST {
        return this._expr();
    }

    private _expr(): AST { // term ((PLUS | MINUS) term)*
        if (!this._currentToken) {
            this._setNext();
        }

        let node = this._term();

        while (
            this._currentToken instanceof MinusToken ||
            this._currentToken instanceof PlusToken
        ) {
            const token = this._currentToken;

            if (token instanceof PlusToken) {
                this._setNext();
            } else if (token instanceof MinusToken) {
                this._setNext();
            }

            node = new BinOpAST(node, token, this._term());
        }

        return node;
    }

    private _factor(): AST { // factor : (PLUS | MINUS) factor | INTEGER | LPAREN expr RPAREN
        const token = this._currentToken;

        if (token instanceof PlusToken) {
            this._setNext();
            return new UnaryOpAST(token, this._factor());
        }

        if (token instanceof MinusToken) {
            this._setNext();
            return new UnaryOpAST(token, this._factor());
        }

        if (token instanceof NumberToken) {
            this._setNext();
            return new NumberAST(token);
        }

        if (token instanceof LParenToken) {
            this._setNext(); // remove lparen
            const ast = this._expr();
            this._setNext(); // remove rparen
            return ast;
        }

        throw new Error(
            `Syntax error. Factor method got execp token ${this._currentToken}`,
        );
    }

    private _term(): AST { // factor ((MUL | DIV) factor)*

        let node = this._factor();

        while (
            this._currentToken instanceof DivToken ||
            this._currentToken instanceof MulToken
        ) {
            const token = this._currentToken;

            if (token instanceof DivToken) {
                this._setNext();
            } else if (token instanceof MulToken) {
                this._setNext();
            }

            node = new BinOpAST(node, token, this._factor());
        }

        return node;
    }

    private _setNext(): void {
        this._currentToken = this._tokenizer.getNextToken();
    }
}
