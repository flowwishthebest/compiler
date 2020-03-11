import { Tokenizer } from './tokenizer';
import { Token } from './tokens/token';
import { EErrorType } from './types/error.type';
import { ParserError } from './errors/parser.error';
import { ETokenType } from './types/token.type';
import { UnaryOpAST } from './ast/unary-op.ast';
import { LiteralAST } from './ast/literal.ast';
import { BinOpAST } from './ast/bin-op.ast';

type UnaryExp = UnaryOpAST | LiteralAST;

export class AnotherParser {
    private readonly UNEXPECTED_TOKEN_MESSAGE = (token: Token): string =>
        `Unexpected token met -> ${token.toString()}`;

    private _token: Token;

    constructor(private readonly _scanner: Tokenizer) {
        this._token = _scanner.getNextToken();
    }

    public parse(): any { // TODO: type
        return this._expression();
    }

    private _expression(): any { // TODO: type
        return this._equality();
    }

    private _equality(): BinOpAST | UnaryExp { // TODO: type
        // quality := comparison ( ( "!=" | "==" ) comparison )* ;
        let expr = this._comparition();

        while (
            this._peek().getType() === ETokenType.BANG_EQUAL ||
            this._peek().getType() === ETokenType.EQUAL_EQUAL
        ) {
            const op = this._peek();

            switch (op.getType()) {
                case ETokenType.BANG_EQUAL: {
                    this._advance(ETokenType.BANG_EQUAL);
                    break;
                }
                case ETokenType.EQUAL_EQUAL: {
                    this._advance(ETokenType.EQUAL_EQUAL);
                    break;
                }
            }

            expr = new BinOpAST(expr, op, this._comparition());
        }

        return expr;
    }

    private _comparition(): BinOpAST | UnaryExp { // TODO: type
        let expr = this._addition();

        while (this._peek().getType() === ETokenType.GREATER ||
            this._peek().getType() === ETokenType.GREATER_EQUAL ||
            this._peek().getType() === ETokenType.LESS ||
            this._peek().getType() === ETokenType.LESS_EQUAL
        ) {
            const op = this._peek();

            switch (op.getType()) {
                case ETokenType.GREATER: {
                    this._advance(ETokenType.GREATER);
                    break;
                }
                case ETokenType.GREATER_EQUAL: {
                    this._advance(ETokenType.GREATER_EQUAL);
                    break;
                }
                case ETokenType.LESS: {
                    this._advance(ETokenType.LESS);
                    break;
                }
                case ETokenType.LESS_EQUAL: {
                    this._advance(ETokenType.LESS_EQUAL);
                    break;
                }
            }

            expr = new BinOpAST(expr, op, this._addition());
        }

        return expr;
    }

    /* comparison := addition ((">" | ">=" | "<" | "<=") addition)* ; */
    private _addition(): BinOpAST | UnaryExp { // TODO: type
        let expr = this._multiplication();

        while (this._peek().getType() === ETokenType.MINUS ||
            this._peek().getType() === ETokenType.PLUS
        ) {
            const op = this._peek();

            switch (op.getType()) {
                case ETokenType.PLUS: {
                    this._advance(ETokenType.PLUS);
                    break;
                }
                case ETokenType.MINUS: {
                    this._advance(ETokenType.MINUS);
                    break;
                }
            }

            expr = new BinOpAST(expr, op, this._multiplication());
        }

        return expr;
    }

    private _multiplication(): UnaryExp | BinOpAST { // TODO: type
        let expr: UnaryExp | BinOpAST = this._unary();

        while (this._peek().getType() === ETokenType.FLOAT_DIV ||
            this._peek().getType() === ETokenType.MUL ||
            this._peek().getType() === ETokenType.INTEGER_DIV
        ) {
            const op = this._peek();

            switch (op.getType()) {
                case ETokenType.FLOAT_DIV: {
                    this._advance(ETokenType.FLOAT_DIV);
                    break;
                }
                case ETokenType.MUL: {
                    this._advance(ETokenType.MUL);
                    return;
                }
                case ETokenType.INTEGER_DIV: {
                    this._advance(ETokenType.INTEGER_DIV);
                    break;
                }
            }

            expr = new BinOpAST(expr, op, this._unary());
        }

        return expr;
    }

    /* unary := ("!" | "-" | "+") unary | primary ; */
    private _unary(): UnaryExp {
        const currentToken = this._peek();

        switch (currentToken.getType()) {
            case ETokenType.BANG: {
                this._advance(ETokenType.BANG);
                break;
            }
            case ETokenType.MINUS: {
                this._advance(ETokenType.MINUS);
                break;
            }
            case ETokenType.PLUS: {
                this._advance(ETokenType.PLUS);
                break;
            }
            default: {
                return this._primary();
            }
        }

        const right = this._unary();

        return new UnaryOpAST(currentToken, right);
    }

    /* primary := NUMBER | "false" | "true" | "nil" | "(" expression ")" ; */
    private _primary(): LiteralAST { // TODO: type for expression
        const currentToken = this._peek();

        switch (currentToken.getType()) {
            case ETokenType.TRUE: {
                this._advance(ETokenType.TRUE);
                return new LiteralAST(currentToken);
            }
            case ETokenType.FALSE: {
                this._advance(ETokenType.FALSE);
                return new LiteralAST(currentToken);
            }
            case ETokenType.NIL: {
                this._advance(ETokenType.NIL);
                return new LiteralAST(currentToken);
            }
            case ETokenType.INTEGER_CONST: {
                this._advance(ETokenType.INTEGER_CONST);
                return new LiteralAST(currentToken);
            }
            case ETokenType.FLOAT_CONST: {
                this._advance(ETokenType.FLOAT_CONST);
                return new LiteralAST(currentToken);
            }
            case ETokenType.LPAREN: {
                this._advance(ETokenType.LPAREN);
                const expr = this._expression();
                this._advance(ETokenType.RPAREN);
                return expr;
            }
        }
    }

    private _peek(): Token {
        return this._token;
    }

    private _advance(type: string): void {
        const currentToken = this._peek();

        if (currentToken.getType() === type) { // take next token
            this._token = this._scanner.getNextToken();
        } else {  // Syntax error.
            this._throw(
                this.UNEXPECTED_TOKEN_MESSAGE(this._peek()),
                EErrorType.UNEXPECTED_TOKEN,
                this._peek(),
            );
        }
    }

    private _throw(msg: string, errType: EErrorType, token: Token): never {
        throw new ParserError(msg, errType, token);
    }
}