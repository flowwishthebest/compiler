import { Scanner } from "./scanner";

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
    const scanner = new Scanner('while (true) { oneme = 1 }');

    for (const token of scanner.getTokensLazy()) {
        console.log('Token: ', token);
    }

    const anotherScanner = new Scanner('if (a < 0) a = 5;');

    for (const t of anotherScanner.getTokensLazy()) {
        console.log('T: ', t);
    }
}

main();
