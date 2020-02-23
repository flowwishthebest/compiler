import { AST } from "./ast/ast";

export class ASTVisitor {

    public visit(node: AST): any | never {
        const methodName = 'visit' + node.constructor.name;
        const visitor = this[methodName] || this.genericVisit;
        return visitor.call(this, node);
    }


    public genericVisit(node: AST): never {
        throw new Error(`No visit{${node.constructor.name}} method`);
    }
}