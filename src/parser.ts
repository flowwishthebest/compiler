import { Tokenizer } from './tokenizer';
import { FloatDivToken } from './tokens/float-div.token';
import { MinusToken } from './tokens/minus.token';
import { MulToken } from './tokens/mul.token';
import { PlusToken } from './tokens/plus.token';
import { Token } from './tokens/token';
import { LParenToken } from './tokens/lparen.token';
import { VariableAST } from './ast/var.ast';
import { UnaryOpAST } from './ast/unary-op.ast';
import { LBracketToken } from './tokens/lbracket.token';
import { IdToken } from './tokens/id.token';
import { SemicolonToken } from './tokens/semicolon.token';
import { EOFToken } from './tokens';
import { AssignAST } from './ast/assign.ast';
import { EmptyAST } from './ast/empty.ast';
import { CompoundAST } from './ast/compound.ast';
import { BinOpAST} from './ast/bin-op.ast';
import { NumberAST } from './ast/number.ast';
import { AST } from './ast/ast';
import { IntegerConstToken } from './tokens/integer-const.token';
import { FloatConstToken } from './tokens/float-const.token';

export class Parser {
    // @Parser = [token, ..., token] -> ast

    private _currentToken: Token;

    constructor(private readonly _tokenizer: Tokenizer) {}

    public parse(): AST {
        const ast = this._programm();

        if (this._currentToken.constructor !== EOFToken) {
            throw new SyntaxError('parse error');
        }

        return ast;
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

        if (token instanceof IntegerConstToken || token instanceof FloatConstToken) {
            this._setNext();
            return new NumberAST(token);
        }

        if (token instanceof LParenToken) {
            this._setNext(); // remove lparen
            const ast = this._expr();
            this._setNext(); // remove rparen
            return ast;
        }

        return this._variable();
    }

    private _term(): AST { // factor ((MUL | DIV) factor)*

        let node = this._factor();

        while (
            this._currentToken instanceof FloatDivToken ||
            this._currentToken instanceof MulToken
        ) {
            const token = this._currentToken;

            if (token instanceof FloatDivToken) {
                this._setNext();
            } else if (token instanceof MulToken) {
                this._setNext();
            }

            node = new BinOpAST(node, token, this._factor());
        }

        return node;
    }

    private _programm(): CompoundAST { // program : compound_statement DOT
        return this._compoundStatement();
    }

    private _compoundStatement(): CompoundAST {
        // compound_statement: BEGIN statement_list END
        this._setNext(); // remove {
        const nodes = this._statementList();
        this._setNext(); // remove }

        const comp = new CompoundAST();

        for (let i = 0; i < nodes.length; i++) {
            comp.getChildren().push(nodes[i]);
        }

        return comp;
    }

    private _statementList(): Array<CompoundAST | AssignAST | EmptyAST> {
        // statement_list : statement | statement SEMI statement_list

        const node = this._statement();

        const results = [node];

        while (this._currentToken.constructor === SemicolonToken) {
            this._setNext();
            results.push(this._statement());
        }

        if (this._currentToken.constructor === IdToken) {
            throw new SyntaxError('Error statement list');
        }

        return results;
    }

    private _statement(): CompoundAST | AssignAST | EmptyAST {
        // statement : compound_statement | assignment_statement | empty

        switch (this._currentToken.constructor) {
            case LBracketToken: {
                return this._compoundStatement();
            }
            case IdToken: {
                return this._assignmentStatement();
            }
            default: {
                return this._empty();
            }
        }
    }

    private _assignmentStatement(): AssignAST {
        // assignment_statement : variable ASSIGN expr

        const left = this._variable();
        const op = this._currentToken;
        this._setNext();
        const right = this._expr();

        return new AssignAST(left, op, right);
    }

    private _variable(): VariableAST {
        const node = new VariableAST(this._currentToken);
        this._setNext();
        return node;
    }

    private _empty(): EmptyAST {
        return new EmptyAST();
    }

    private _setNext(): void {
        this._currentToken = this._tokenizer.getNextToken();
    }
}
