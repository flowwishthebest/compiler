import { AST } from "./ast";
import { Token } from "../tokens/token";
import { BlockStmtAST } from "./block-stm.ast";

export class FuncAST extends AST {
    constructor(
        private readonly _nameToken: Token,
        private readonly _params: Array<AST>,
        private readonly _body: BlockStmtAST,
    ) {
        super();
    }

    public getBody(): BlockStmtAST {
        return this._body;
    }

    public getName(): string {
        return this._nameToken.getValue();
    }

    public getParams(): Array<AST> {
        return this._params;
    }
}
