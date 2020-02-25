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
import { ColonToken, IntegerTypeToken } from './tokens';
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
import { FloatTypeToken } from './tokens/float-type.token';
import { ProgramAST } from './ast/program.ast';
import { IntegerDivToken } from './tokens/integer-div.token';
import { ProcedureToken } from './tokens/procedure.token';
import { ProcedureDeclarationAST } from './ast/procedure-declaration.ast';
import { ParametersAST } from './ast/parameters.ast';
import { threadId } from 'worker_threads';

export class Parser {
    // @Parser = [token, ..., token] -> ast

    private _currentToken: Token;

    constructor(private readonly _tokenizer: Tokenizer) {}

    public parse(): AST {
        const ast = this._programm();

        // if (this._currentToken.constructor !== EOFToken) {
        //     throw new SyntaxError('parse error');
        // }

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

    private _factor(): AST {
        // factor : PLUS factor | MINUS factor | INTEGER_CONST | REAL_CONST | LPAREN expr RPAREN | variable
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
                this._setNext();
            } else if (token instanceof MulToken) {
                this._setNext();
            } else if (token instanceof IntegerDivToken) {
                this._setNext();
            }

            node = new BinOpAST(node, token, this._factor());
        }

        return node;
    }

    private _programm(): ProgramAST {
        // program : compound_statement DOT
        this._setNext(); // setup token
        this._setNext(); // remove programm kw
        const varNode = this._variable();
        const progName = varNode.getToken().getValue();

        this._setNext(); // remove ;

        const block = this._block();

        const progNode = new ProgramAST(progName, block);

        return progNode;
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

    private _block(): BlockAST {
        // block : declarations compound_statement

        const declarations = this._declarations();
        const compoundStatement = this._compoundStatement();
        return new BlockAST(declarations, compoundStatement);
    }

    private _declarations(): Array<VariableDeclarationAST> {
        /**
         *  declarations : (VAR (variable_declaration SEMI)+)*
         *      | (PROCEDURE ID (LPAREN formal_parameter_list RPAREN)? SEMI block SEMI)*
         *      | empty
         **/

        const declarations = [];

        for (;;) {
            if (this._currentToken instanceof VarToken) {
                this._setNext();
    
                while (this._currentToken instanceof IdToken) {
                    const variableDeclaration = this._variableDeclaration();
                    declarations.push(...variableDeclaration);
                    this._setNext(); // remove ;
                }
            } else if (this._currentToken instanceof ProcedureToken) {
                this._setNext(); // remove procedure kw
    
                const procName = this._currentToken;
    
                this._setNext(); // remove ID
    
                let params = [];
    
                if (this._currentToken instanceof LParenToken) {
                    this._setNext(); // remove (
    
                    params = this._formalParameterList();
    
                    this._setNext(); // remove )
    
                }
    
                this._setNext(); // remove ;
    
                const blockNode = this._block();
    
                const procDecl = new ProcedureDeclarationAST(
                    procName,
                    params,
                    blockNode,
                );
    
                declarations.push(procDecl);
    
                this._setNext(); // remove ;
            } else {
                break;
            }
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
             this._setNext(); // remove ;
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
         this._setNext(); // remove ID

         while (this._currentToken instanceof CommaToken) {
             this._setNext(); // remove ;
             paramTokens.push(this._currentToken);
             this._setNext(); // remove ID
         }

         this._setNext(); // remove :

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
        this._setNext();
        while (this._currentToken instanceof CommaToken) {
            this._setNext();
            varibleNode.push(new VariableAST(this._currentToken));
            this._setNext();
        }
        
        if (this._currentToken instanceof ColonToken) {
            this._setNext(); // remove colon
        } else {
            throw new Error('Expected colon after var declaration');
        }
        
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
        switch (token.constructor) {
            case IntegerTypeToken: {
                this._setNext();
                break;
            }
            case FloatTypeToken: {
                this._setNext();
                break;
            }
            default: {
                throw new Error('Unsupported type ' + token.constructor.name);
            }
        }

        return new TypeAST(token);
    }

    private _setNext(): void {
        this._currentToken = this._tokenizer.getNextToken();
    }
}
