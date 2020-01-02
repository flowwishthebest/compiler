import { NodeVisitor } from '../../../interpreter/src';
import { INode, IParser } from '../../../parser/src';
import { IInterpreter } from './interpreter.interface';

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
