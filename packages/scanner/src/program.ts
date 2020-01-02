// tslint:disable:ordered-imports
import { Scanner } from './scanner';
import { IToken } from './tokens/token.interface';
import { IScanner } from './scanner.interface';
import { IntegerToken } from './tokens/interger.token';
import { LParToken } from './tokens/lpar.token';
import { RParToken } from './tokens/rpar.token';
import { MulToken } from './tokens/mul.token';
import { DivToken } from './tokens/div.token';
import { PlusToken } from './tokens/plus.token';
import { MinusToken } from './tokens/minus.token';

// export interface INode<T = any> {

// }

// export abstract class Node<T = any> implements INode<T> {

//     constructor(
//         public readonly kind: string,
//         public readonly value?: T,
//         public readonly op1?: any,
//         public readonly op2?: any,
//         public readonly op3?: any,
//     ) {}
// }

// export enum ENodeType {
//     VAR   = 'VAR',
//     CONST = 'CONST',
//     ADD   = 'ADD',
//     SUB   = 'SUB',
//     LT    = 'LT',
//     ET    = 'ET',
//     IF1   = 'IF1',
//     IF2   = 'IF2',
//     WHILE = 'WHILE',
//     DO    = 'DO',
//     EMPTY = 'EMPTY',
//     SEQ   = 'SEQ',
//     EXPR  = 'EXPR',
//     PROG  = 'PROG',
//     SET = 'SET',
// }

// export class ProgNode extends Node<any> {
//     constructor(op1) {
//         super(ENodeType.PROG, undefined, op1);
//     }
// }

// export class IfNode extends Node<any> {
//     constructor() {
//         super(ENodeType.IF1);
//     }
// }

// export class VarNode extends Node<string> {
//     constructor(value: string) {
//         super(ENodeType.VAR, value);
//     }
// }

// export class ConstNode extends Node<number> {
//     constructor(value: number) {
//         super(ENodeType.VAR, value);
//     }
// }

// export class SetNode extends Node {
//     constructor() {
//         super(ENodeType.SET)
//     }
// }

// export class Parser {
//     private readonly _tokenGen: Generator<IToken>;

//     constructor(
//         private readonly _lexer: ILexer,
//     ) {
//         this._tokenGen = this._lexer.getTokensLazy();
//     }

//     public parse(): INode {
//         const { value: token } = this._tokenGen.next();

//         const node = new ProgNode(this.statement());

//         if (!(token.value instanceof EofToken)) {
//             throw new Error('Invalid statement syntax');
//         }

//         return node;
//     }

//     private _statement(token: IToken): INode {

//         if (token instanceof IfToken) {
//             const node = new IfNode();
//             node.op1 = this.parenExpr();
//             node.op2 = this.statement(nextToken.value);
//         }

//         if self.lexer.sym == Lexer.IF:
//         n = Node(Parser.IF1)
//         self.lexer.next_tok()
//         n.op1 = self.paren_expr()
//         n.op2 = self.statement()
//         if self.lexer.sym == Lexer.ELSE:
//             n.kind = Parser.IF2
//             self.lexer.next_tok()
//             n.op3 = self.statement()
//     elif self.lexer.sym == Lexer.WHILE:
//         n = Node(Parser.WHILE)
//         self.lexer.next_tok()
//         n.op1 = self.paren_expr()
//         n.op2 = self.statement();
//     elif self.lexer.sym == Lexer.DO:
//         n = Node(Parser.DO)
//         self.lexer.next_tok()
//         n.op1 = self.statement()
//         if self.lexer.sym != Lexer.WHILE:
//             self.error('"while" expected')
//         self.lexer.next_tok()
//         n.op2 = self.paren_expr()
//         if self.lexer.sym != Lexer.SEMICOLON:
//             self.error('";" expected')
//     elif self.lexer.sym == Lexer.SEMICOLON:
//         n = Node(Parser.EMPTY)
//         self.lexer.next_tok()
//     elif self.lexer.sym == Lexer.LBRA:
//         n = Node(Parser.EMPTY)
//         self.lexer.next_tok()
//         while self.lexer.sym != Lexer.RBRA:
//             n = Node(Parser.SEQ, op1 = n, op2 = self.statement())
//         self.lexer.next_tok()
//     else:
//         n = Node(Parser.EXPR, op1 = self.expr())
//         if self.lexer.sym != Lexer.SEMICOLON:
//             self.error('";" expected')
//         self.lexer.next_tok()
//     return n
//     }

//     private _parenExpr(token: IToken): INode {
//         if (!(token instanceof LeftParentToken)) {
//             throw new Error('"(" expected');
//         }

//         const t = this._tokenGen.next().value;

//         const node = this._expr(t);
//     }

//     private _expr(token: IToken): INode {
//         if (!(token instanceof IdentToken)) {
//             return this._test(token);
//         }

//         let node = this._test(token);

//         if (node instanceof VarNode && token instanceof EqualToken) {
//             const nextToken = this._tokenGen.next().value;
//             let node = new SetNode();
//             node.op1 = node;
//             node.op2 = this._expr();
//         }

//         return node;
//     }

//     private _test(token: IToken): INode {
// 		n = self.summa()
// 		if self.lexer.sym == Lexer.LESS:
// 			self.lexer.next_tok()
// 			n = Node(Parser.LT, op1 = n, op2 = self.summa())
// 		return n
//     }

//     private _term(token: IToken): INode {
//         if (token instanceof IdentToken) {
//             const node = new VarNode(token.getValue());

//             // self.lexer.next_tok()
//             return node;
//         } else if (token instanceof IntegerToken) {
//             const node = new ConstNode(token.getValue());

//             // this._tokenGen.next();

//             return node;
//         } else {
//             return this._parenExpr();
//         }
//     }




//     public summa(token: IToken): INode {
//         n = self.term()
//         while self.lexer.sym == Lexer.PLUS or self.lexer.sym == Lexer.MINUS:
//             if self.lexer.sym == Lexer.PLUS:
//                 kind = Parser.ADD
//             else:
//                 kind = Parser.SUB
//             self.lexer.next_tok()
//             n = Node(kind, op1 = n, op2 = self.term())
//         return n
//     }

//     public expr(token: IToken): INode {
//         if (token instanceof IdentToken) {

//         }
//             return self.test()
//     n = self.test()
//     if n.kind == Parser.VAR and self.lexer.sym == Lexer.EQUAL:
//         self.lexer.next_tok()
//         n = Node(Parser.SET, op1 = n, op2 = self.expr())
//     return n
//     }
// }

export function main(): void {
    const code = '2 * 7 + 3';
    const scanner = new Scanner(code);

    const tokensGenerator = scanner.getTokensLazy();

    for (const t of tokensGenerator) {
        console.log('Token: ', t);
    }
    // const scanner = new Scanner('while (true) { oneme = 1 }');

    // for (const token of scanner.getTokensLazy()) {
    //     console.log('Token: ', token);
    // }

    // const anotherScanner = new Scanner('if (a < 0) a = 5;');

    // for (const t of anotherScanner.getTokensLazy()) {
    //     console.log('T: ', t);
    // }
}

main();


// tslint:disable

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

        this.currentToken = this.tokenGenerator.next().value;
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