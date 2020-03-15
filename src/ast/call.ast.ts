import { AST } from "./ast";
import { Token } from "../tokens/token";

export class CallAST extends AST {

    constructor(
        private readonly _calle: AST,
        private readonly _parent: Token,
        private readonly _arguments: Array<AST>,
    ) {
        super();
    }

    public getArguments(): Array<AST> {
        return this._arguments;
    }

    public getCalle(): AST {
        return this._calle;
    }
}