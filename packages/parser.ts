import { INode } from './ast/abstract.ast';
import { BinOpAst } from './ast/bin-op.ast';
import { NumAst } from './ast/num.ast';
import { UnaryOpAst } from './ast/unary-op.ast';
import { IParser } from './parser.interface';
import { IScanner } from './scanner.interface';
import { DivToken } from './tokens/div.token';
import { IntegerToken } from './tokens/interger.token';
import { LParToken } from './tokens/lpar.token';
import { MinusToken } from './tokens/minus.token';
import { MulToken } from './tokens/mul.token';
import { PlusToken } from './tokens/plus.token';
import { RParToken } from './tokens/rpar.token';
import { IToken } from './tokens/token.interface';

export class Parser implements IParser {

    private currentToken: IToken;
    private tokenGenerator: Generator<IToken>;

    constructor(scanner: IScanner) {
        this.tokenGenerator = scanner.getTokensLazy();

        this.currentToken = this.tokenGenerator.next().value;
    }

    public parse(): INode {
        return this._expr();
    }

    /**
     * compare the current token type with the passed token
     * type and if they match then "eat" the current token
     * and assign the next token to the self.current_token,
     * otherwise raise an exception.
     */
    private _eat(token: IToken): void {
        if (this.currentToken.getType() === token.getType()) {
            this.currentToken = this.tokenGenerator.next().value;
        } else {
            throw new Error('Parse error');
        }
    }

    /**
     * factor : INTEGER | LPAREN expr RPAREN
     * factor : (PLUS | MINUS) factor | INTEGER | LPAREN expr RPAREN
     */
    private _factor(): INode {
        const token = this.currentToken;

        if (token instanceof PlusToken) {
            this._eat(token);
            return new UnaryOpAst(token, this._factor());
        } else if (token instanceof MinusToken) {
            this._eat(token);
            return new UnaryOpAst(token, this._factor());
        } else if (token instanceof IntegerToken) {
            this._eat(token);
            return new NumAst(token);
        } else if (token instanceof LParToken) {
            this._eat(new LParToken());
            const node = this._expr();
            this._eat(new RParToken());
            return node;
        }
    }

    /**
     * term : factor ((MUL | DIV) factor)*
     */
    private _term(): INode {
        let node = this._factor();

        while (this.currentToken instanceof MulToken
            || this.currentToken instanceof DivToken
        ) {
            const token = this.currentToken;

            if (token instanceof MulToken) {
                this._eat(token);
            } else if (token instanceof DivToken) {
                this._eat(token);
            }

            node = new BinOpAst(token, node, this._factor());
        }

        return node;
    }

    /*
        expr: term ((PLUS | MINUS) term)*
        term: factor ((MUL | DIV) factor)*
        factor: INTEGER | LPAREN expr RPAREN
    */
    private _expr(): INode {
        let node = this._term();

        while (this.currentToken instanceof PlusToken ||
            this.currentToken instanceof MinusToken
        ) {
            const token = this.currentToken;

            if (token instanceof PlusToken) {
                this._eat(token);
            } else if (token instanceof MinusToken) {
                this._eat(token);
            }

            node = new BinOpAst(token, node, this._term());
        }

        return node;
    }
}
