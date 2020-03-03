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
import { AssignAST } from './ast/assign.ast';
import { EmptyAST } from './ast/empty.ast';
import { CompoundAST } from './ast/compound.ast';
import { BinOpAST} from './ast/bin-op.ast';
import { NumberAST } from './ast/number.ast';
import { AST } from './ast/ast';
import { IntegerConstToken } from './tokens/integer-const.token';
import { FloatConstToken } from './tokens/float-const.token';
import { BlockAST } from './ast/block.ast';
import { VariableDeclarationAST } from './ast/variable-declaration.ast';
import { VarToken } from './tokens/var.token';
import { CommaToken } from './tokens/comma.token';
import { TypeAST } from './ast/type.ast';
import { ProgramAST } from './ast/program.ast';
import { IntegerDivToken } from './tokens/integer-div.token';
import { ProcedureToken } from './tokens/procedure.token';
import { ProcedureDeclarationAST } from './ast/procedure-declaration.ast';
import { ParametersAST } from './ast/parameters.ast';
import { ParserError } from './errors/parser.error';
import { EErrorType } from './types/error.type';
import { ETokenType } from './types';
import { ProcedureCallAST } from './ast/procedure-call.ast';
import { IfAST } from './ast/if.ast';

const UNEXPECTED_TOKEN_MESSAGE = (token: Token): string =>
    `Unexpected token met -> ${token.toString()}`;

type Statement = CompoundAST | AssignAST | EmptyAST | ProcedureCallAST;

export class Parser {
    private _currentToken: Token;

    constructor(private readonly _tokenizer: Tokenizer) {
        this._currentToken = this._tokenizer.getNextToken();
    }

    public parse(): AST {
        const ast = this._programm();

        this._eat(ETokenType.EOF);

        return ast;
    }

    private _expr(): AST {
        /* term ((PLUS | MINUS) term)* */
        let node = this._term();

        while (
            this._currentToken instanceof MinusToken ||
            this._currentToken instanceof PlusToken
        ) {
            const token = this._currentToken;

            if (token instanceof PlusToken) {
                this._eat(ETokenType.PLUS);
            } else if (token instanceof MinusToken) {
                this._eat(ETokenType.MINUS);
            }

            node = new BinOpAST(node, token, this._term());
        }

        return node;
    }

    private _factor(): AST {
        // factor : PLUS factor | MINUS factor | INTEGER_CONST | REAL_CONST | LPAREN expr RPAREN | variable
        const token = this._currentToken;

        if (token instanceof PlusToken) {
            this._eat(ETokenType.PLUS);
            return new UnaryOpAST(token, this._factor());
        }

        if (token instanceof MinusToken) {
            this._eat(ETokenType.MINUS);
            return new UnaryOpAST(token, this._factor());
        }

        if (token instanceof IntegerConstToken) {
            this._eat(ETokenType.INTEGER_CONST);
            return new NumberAST(token);
        }

        if (token instanceof FloatConstToken) {
            this._eat(ETokenType.FLOAT_CONST);
            return new NumberAST(token);
        }

        if (token instanceof LParenToken) {
            this._eat(ETokenType.LPAREN); // remove lparen
            const ast = this._expr();
            this._eat(ETokenType.RPAREN); // remove rparen
            return ast;
        }

        return this._variable();
    }

    private _term(): AST {
        // term : factor ((MUL | INTEGER_DIV | FLOAT_DIV) factor)*

        let node = this._factor();

        while (
            this._currentToken instanceof FloatDivToken ||
            this._currentToken instanceof MulToken ||
            this._currentToken instanceof IntegerDivToken
        ) {
            const token = this._currentToken;

            if (token instanceof FloatDivToken) {
                this._eat(ETokenType.FLOAT_DIV);
            } else if (token instanceof MulToken) {
                this._eat(ETokenType.MUL);
            } else if (token instanceof IntegerDivToken) {
                this._eat(ETokenType.INTEGER_DIV);
            }

            node = new BinOpAST(node, token, this._factor());
        }

        return node;
    }

    private _programm(): ProgramAST {
        // program : compound_statement DOT
        // this._setNext(); // setup token
        this._eat(ETokenType.PROGRAM); // remove programm kw
        const varNode = this._variable();
        const progName = varNode.getToken();

        this._eat(ETokenType.SEMICOLON); // remove ;

        const block = this._block();

        const progNode = new ProgramAST(progName, block);

        return progNode;
    }

    private _compoundStatement(): CompoundAST {
        /**
         * compound_statement: BEGIN statement_list END
        **/

        this._eat(ETokenType.LBRACKET); // remove {
        const nodes = this._statementList();
        this._eat(ETokenType.RBRACKET); // remove }

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
            this._eat(ETokenType.SEMICOLON);
            results.push(this._statement());
        }

        if (this._currentToken.constructor === IdToken) {
            throw new SyntaxError('Error statement list');
        }

        return results;
    }

    private _statement(): Statement {
        // statement : compound | if | assign | call | empty
        if (this._currentToken.getType() === ETokenType.IF) {
            return this._ifStatement();
        }

        if (this._currentToken.getType() === ETokenType.LBRACKET) {
            return this._compoundStatement();
        }

        if (this._currentToken.getType() === ETokenType.ID
            && this._tokenizer.getCurrentChar() === '('
        ) {
            return this._procedureCallStatement();
        }

        if (this._currentToken.getType() === ETokenType.ID) {
            return this._assignmentStatement();
        }

        return this._empty();
    }

    private _assignmentStatement(): AssignAST {
        // assignment_statement : variable ASSIGN expr

        const left = this._variable();
        const op = this._currentToken;
        this._eat(ETokenType.ASSIGN);
        const right = this._expr();

        return new AssignAST(left, op, right);
    }

    private _variable(): VariableAST {
        const node = new VariableAST(this._currentToken);
        this._eat(ETokenType.ID);
        return node;
    }

    private _empty(): EmptyAST {
        return new EmptyAST();
    }

    private _block(): BlockAST {
        // block : declarations compound_statement

        const declarations = this._declarations();
        const compoundStatement = this._compoundStatement();
        return new BlockAST(declarations, compoundStatement);
    }

    private _procedureDeclaration(): ProcedureDeclarationAST {
        /**
         * procedure_declaration :
         * PROCEDURE ID (LPAREN formal_parameter_list RPAREN)? SEMI block SEMI
        **/

       this._eat(ETokenType.PROCEDURE); // remove prog kw
    
       const procName = this._currentToken;

       this._eat(ETokenType.ID) // remove ID

       let params = [];

       if (this._currentToken instanceof LParenToken) {
           this._eat(ETokenType.LPAREN); // remove (

           params = this._formalParameterList();

           this._eat(ETokenType.RPAREN); // remove )

       }

       this._eat(ETokenType.SEMICOLON); // remove ;

       const blockNode = this._block();

       const procDecl = new ProcedureDeclarationAST(
           procName,
           params,
           blockNode,
       );
       
       this._eat(ETokenType.SEMICOLON); // remove ;

       return procDecl;
    }

    private _declarations(): Array<VariableDeclarationAST> {
        /**
         * declarations :
         * (VAR (variable_declaration SEMI)+)? procedure_declaration*
         **/

        const declarations = [];

        if (this._currentToken instanceof VarToken) {
            this._eat(ETokenType.VAR);

            while (this._currentToken instanceof IdToken) {
                const variableDeclaration = this._variableDeclaration();
                declarations.push(...variableDeclaration);
                this._eat(ETokenType.SEMICOLON); // remove ;
            }
        }

        while (this._currentToken instanceof ProcedureToken) {
            const procDecl = this._procedureDeclaration();
            declarations.push(procDecl);
        }

        return declarations;
    }

    private _formalParameterList(): Array<ParametersAST> {
        /**
         *  formal_parameter_list : formal_parameters   |
         *  formal_parameters SEMI formal_parameter_list
         * */ 

         if (!(this._currentToken instanceof IdToken)) {
             return [];
         }

         const paramNodes = this._formalParameters();

         while (this._currentToken instanceof SemicolonToken) {
             this._eat(ETokenType.SEMICOLON); // remove ;
             paramNodes.push(...this._formalParameters());
         }

         return paramNodes;
    }

    private _formalParameters(): Array<ParametersAST> {
        /**
         * spec:
         *      > formal_parameters : ID (COMMA ID)* COLON type_spec
         * 
         * example:
         *      > procedure Foo;
         *      > procedure Foo(a: integer);
         *      > procedure Foo(a, b: integer);
         *      > procedure Foo(a, b: integer; c: float);
         * */

         const paramNodes = [];

         const paramTokens = [this._currentToken];
         this._eat(ETokenType.ID); // remove ID

         while (this._currentToken instanceof CommaToken) {
             this._eat(ETokenType.SEMICOLON); // remove ;
             paramTokens.push(this._currentToken);
             this._eat(ETokenType.ID); // remove ID
         }

         this._eat(ETokenType.COLON); // remove :

         const typeNode = this._typeSpec();

         paramTokens.forEach((t) => {
             const paramNode = new ParametersAST(
                 new VariableAST(t),
                 typeNode,
             )

             paramNodes.push(paramNode);
         });

         return paramNodes;
    }

    private _variableDeclaration(): Array<VariableDeclarationAST> {
        // variable_declaration : ID (COMMA ID)* COLON type_spec

        const varibleNode = [new VariableAST(this._currentToken)];
        this._eat(ETokenType.ID);
        while (this._currentToken instanceof CommaToken) {
            this._eat(ETokenType.COMMA);
            varibleNode.push(new VariableAST(this._currentToken));
            this._eat(ETokenType.ID);
        }
        
        this._eat(ETokenType.COLON); 
        
        const typeNode = this._typeSpec();
        const variableDeclarations = [];

        for (let i = 0; i < varibleNode.length; i++) {
            variableDeclarations.push(
                new VariableDeclarationAST(varibleNode[i], typeNode),
            );
        }

        return variableDeclarations;
    }

    private _typeSpec(): TypeAST {
        // type_spec : integer | real

        const token = this._currentToken;
        switch (token.getType()) {
            case ETokenType.INTEGER: {
                this._eat(ETokenType.INTEGER);
                break;
            }
            case ETokenType.FLOAT: {
                this._eat(ETokenType.FLOAT);
                break;
            }
            default: {
                throw new Error('Unsupported type ' + token.constructor.name);
            }
        }

        return new TypeAST(token);
    }

    private _procedureCallStatement(): ProcedureCallAST {
        /** proccall_statement : ID LPAREN (expr (COMMA expr)*)? RPAREN */

        const token = this._currentToken;
        const procedureName = token.getValue();

        this._eat(ETokenType.ID);
        this._eat(ETokenType.LPAREN);

        const params = []
        if (this._currentToken.getType() !== ETokenType.RPAREN) {
            const node = this._expr();
            params.push(node);
        }

        while (this._currentToken.getType() === ETokenType.COMMA) {
            this._eat(ETokenType.COMMA);
            const node = this._expr();
            params.push(node);
        }

        this._eat(ETokenType.RPAREN);
        this._eat(ETokenType.SEMICOLON);

        const node = new ProcedureCallAST(procedureName, params, token);
        // TODO: remove procedure name or token

        return node
    }

    private _ifStatement(): IfAST {
        this._eat(ETokenType.IF);

        const condition = this._expr();

        this._eat(ETokenType.LBRACKET);
        const ifPart = this._statement();
        this._eat(ETokenType.RBRACKET);

        let elsePart = null;
        if (this._currentToken.getType() === ETokenType.ELSE) {
            this._eat(ETokenType.ELSE);
            elsePart = this._statement();
        }

        return new IfAST(condition, ifPart, elsePart);
    }

    private _eat(type: ETokenType): void | never {
        if (this._currentToken.getType() === type) {
            this._currentToken = this._tokenizer.getNextToken();
        } else {
            this._throw(
                UNEXPECTED_TOKEN_MESSAGE(this._currentToken),
                EErrorType.UNEXPECTED_TOKEN,
                this._currentToken,
            );
        }
    }

    private _throw(msg: string, errType: EErrorType, token: Token): never {
        throw new ParserError(msg, errType, token);
    }
}
