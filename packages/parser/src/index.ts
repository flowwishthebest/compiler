// tslint:disable

import { IToken } from '../../scanner/src/tokens/token.interface';
import { IScanner } from '../../scanner/src/scanner.interface';
import { IntegerToken } from '../../scanner/src/tokens/interger.token';
import { LParToken } from '../../scanner/src/tokens/lpar.token';
import { RParToken } from '../../scanner/src/tokens/rpar.token';
import { MulToken } from '../../scanner/src/tokens/mul.token';
import { DivToken } from '../../scanner/src/tokens/div.token';
import { PlusToken } from '../../scanner/src/tokens/plus.token';
import { MinusToken } from '../../scanner/src/tokens/minus.token';
import { Scanner } from '../../scanner/src/scanner';

export interface INode {

}

export abstract class Node implements INode {

}

export class Ast {

}

export class BinOpAst extends Ast {

    constructor(
        private readonly left: INode,
        private readonly operation: IToken,
        private readonly right: INode,
    ) {
        super();
    }
}

export class NumAst extends Ast {

    constructor(
        private readonly token: IToken,
    ) {
        super();
    }
}

export interface IParser {
    parse(): any;
}

export class Parser implements IParser {

    private currentToken: IToken;
    private tokenGenerator: Generator<IToken>;

    constructor(
        private readonly scanner: IScanner,
    ) {
        this.tokenGenerator = scanner.getTokensLazy();

        this.currentToken = this.tokenGenerator.next().value();
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
     */
    private _factor(): INode {
        const token = this.currentToken;

        if (token instanceof IntegerToken) {
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

            node = new BinOpAst(node, token, this._factor());
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

            node = new BinOpAst(node, token, this._term());
        }

        return node;
    }

    public parse(): INode {
        return this._expr();
    }
}

export function oneme() {
    const parser = new Parser(
        new Scanner('7 + 2 * 3'),
    );

    console.log(parser.parse());
}

oneme();