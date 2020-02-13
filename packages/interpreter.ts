import { INode } from './ast/abstract.ast';
import { NodeVisitor } from './ast/node.visitor';
import { IInterpreter } from './interpreter.interface';
import { IParser } from './parser.interface';

export class Interpreter extends NodeVisitor implements IInterpreter {
    private readonly ast: INode;

    constructor(parser: IParser) {
        super();
        this.ast = parser.parse();
    }

    public interpret(): any {
        return this.visit(this.ast);
    }
}
