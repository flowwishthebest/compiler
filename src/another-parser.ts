import { Tokenizer } from './tokenizer';
import { Token } from './tokens/token';
import { EErrorType } from './types/error.type';
import { ParserError } from './errors/parser.error';
import { ETokenType } from './types/token.type';
import { UnaryOpAST } from './ast/unary-op.ast';
import { LiteralAST } from './ast/literal.ast';
import { BinOpAST } from './ast/bin-op.ast';
import { VariableAST, AssignAST } from './ast';
import { PrintAST } from './ast/print.ast';
import { ExpressionAST } from './ast/expression.ast';
import { ProgAST
 } from './ast/prog.ast';
import { BlockStmtAST } from './ast/block-stm.ast';
import { VarDeclAST } from './ast/var-decl.ast';
import { IfAST } from './ast/if.ast';
import { LogicalAST } from './ast/logical.ast';
import { WhileAST } from './ast/while.ast';

type UnaryExp = UnaryOpAST | LiteralAST | PrimaryExp;
type PrimaryExp = LiteralAST | VariableAST;
type Statement = WhileAST | PrintAST | BlockStmtAST | IfAST;

export class AnotherParser {
    private readonly UNEXPECTED_TOKEN_MESSAGE = (token: Token): string =>
        `Unexpected token met -> ${token.toString()}`;

    private _token: Token;

    constructor(private readonly _scanner: Tokenizer) {
        this._token = _scanner.getNextToken();
    }

    public parse(): ProgAST { // TODO: type
        return this._program();
    }

    private _program(): ProgAST {
        const progAST = new ProgAST();

        const statements = progAST.getStatements();

        while (this._peek().getType() !== ETokenType.EOF) {
            statements.push(this._declaration());
        }

        return progAST;
    }

    private _declaration(): any {
        // TODO: sync
        const currentToken = this._peek();

        switch (currentToken.getType()) {
            case ETokenType.VAR: {
                this._advance(ETokenType.VAR);
                return this._varDecl();
            }
            default: {
                return this._statement();
            }
        }
    }

    private _varDecl(): any {
        const varToken = this._peek();

        this._advance(ETokenType.ID);

        let initializer = null;
        if (this._peek().getType() === ETokenType.ASSIGN) {
            this._advance(ETokenType.ASSIGN);
            initializer = this._expression();
        }

        this._advance(ETokenType.SEMICOLON);

        return new VarDeclAST(varToken, initializer);
    }

    private _statement(): Statement {
        const currentToken = this._peek();

        switch (currentToken.getType()) {
            case ETokenType.IF: {
                this._advance(ETokenType.IF);
                return this._if();
            }
            case ETokenType.PRINT: {
                this._advance(ETokenType.PRINT);
                return this._print();
            }
            case ETokenType.WHILE: {
                this._advance(ETokenType.WHILE);
                return this._while();
            }
            case ETokenType.LBRACKET: {
                this._advance(ETokenType.LBRACKET);
                return this._block();
            }
            default: {
                return this._expressionStmt();
            }
        }
    }

    private _while(): WhileAST {
        this._advance(ETokenType.LPAREN);
        const condition = this._expression();
        this._advance(ETokenType.RPAREN);

        const body = this._statement();

        return new WhileAST(condition, body);
    }

    private _if(): IfAST {
        this._advance(ETokenType.LPAREN);
        const condition = this._expression();
        this._advance(ETokenType.RPAREN);

        const truePart = this._statement();

        let falsePart = null;
        if (this._peek().getType() === ETokenType.ELSE) {
            this._advance(ETokenType.ELSE);
            falsePart = this._statement();
        }

        return new IfAST(condition, truePart, falsePart);
    }

    private _block(): BlockStmtAST {
        const block = new BlockStmtAST()
        const statements = block.getStatements();

        while (this._peek().getType() !== ETokenType.RBRACKET
            && !this._isAtEnd()
        ) {
            statements.push(this._declaration());
        }

        this._advance(ETokenType.RBRACKET);

        return block;
    }

    private _print(): PrintAST {
        const expr = this._expression();
        this._advance(ETokenType.SEMICOLON);
        return new PrintAST(expr);
    }

    private _expressionStmt(): any {
        const expression = this._expression();
        this._advance(ETokenType.SEMICOLON);
        return new ExpressionAST(expression);
    }

    private _expression(): any { // TODO: type
        return this._assignment();
    }

    private _assignment(): any {
        const expr = this._or();

        if (this._peek().getType() === ETokenType.ASSIGN) {
            const t = this._peek();
            this._advance(ETokenType.ASSIGN);
            const val = this._assignment();

            if (expr instanceof VariableAST) {
                return new AssignAST(expr, t , val);
            }

            throw new Error('Invalid assignment target.');
        }

        return expr;
    }

    private _and(): LogicalAST | BinOpAST | UnaryExp {
        let expr = this._equality();

        while (this._peek().getType() === ETokenType.AND) {
            const op = this._peek();

            this._advance(ETokenType.AND);

            expr = new LogicalAST(expr, op, this._equality());
        }

        return expr;
    }

    private _or(): any {
        let expr = this._and();

        while (this._peek().getType() === ETokenType.OR) {
            const op = this._peek();
            this._advance(ETokenType.OR);
            expr = new LogicalAST(expr, op, this._and());
        }
        
        return expr;
    }

    private _equality(): LogicalAST | BinOpAST | UnaryExp { // TODO: type
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

    private _multiplication(): UnaryExp | BinOpAST  { // TODO: type
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
                    break;
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
    private _primary(): PrimaryExp { // TODO: type for expression
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
            case ETokenType.ID: {
                this._advance(ETokenType.ID);
                return new VariableAST(currentToken);
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

    private _isAtEnd(): boolean {
        return this._peek().getType() === ETokenType.EOF;
    }
}