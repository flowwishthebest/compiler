import { IParser, Parser } from '../../parser/src';
import { Scanner } from '../../scanner/src/scanner';
import { DivToken } from '../../scanner/src/tokens/div.token';
import { MinusToken } from '../../scanner/src/tokens/minus.token';
import { MulToken } from '../../scanner/src/tokens/mul.token';
import { PlusToken } from '../../scanner/src/tokens/plus.token';
import { IToken } from '../../scanner/src/tokens/token.interface';

// tslint:disable

export interface INode {
    getToken(): IToken;
    getLeft(): INode;
    getRight(): INode;
}

export class NodeVisitor {
    public visit(node: INode): any {
        const methodName = 'visit' + node.constructor.name;
        const visitor = this[methodName] || this.genericVisit;

        return visitor(node);
    }
    
    public genericVisit(node: INode): never {
        const visitMethod = 'visit' + node.constructor.name;
        throw new Error(`No ${visitMethod} method`);
    }
}


export class Interpreter extends NodeVisitor {
    constructor(
        private readonly parser: IParser,
    ) {
        super();
    }

    public visitBinOpAst(node: INode): any {
        const token = node.getToken();
        const left = node.getLeft();
        const right = node.getRight();

        if (token instanceof PlusToken) {
            return this.visit(left) + this.visit(right);
        } else if (token instanceof MinusToken) {
            return this.visit(left) - this.visit(right);
        } else if (token instanceof MulToken) {
            return this.visit(left) * this.visit(right);
        } else if (token instanceof DivToken) {
            return this.visit(left) / this.visit(right);
        } else {
            return this.genericVisit(node);
        }
    }

    public visitNumAst(node: INode): any {
        return node.getToken().getValue();
    }

    public interpret(): any {
        const ast = this.parser.parse();
        return this.visit(ast);
    }
}


function tst() {
    const interpreter = new Interpreter(
        new Parser(
            new Scanner('7 + 3 * 2'),
        ),
    );
}

tst();
