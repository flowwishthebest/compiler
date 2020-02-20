import { AST } from "./ast";
import { Token } from "../tokens/token";
import { BlockAST } from "./block.ast";

export class ProgramAST extends AST {

    constructor(
        private readonly _token: Token,
        private readonly _block: BlockAST,
    ) {
        super();
    }

    public getToken(): Token {
        return this._token;
    }

    public getBlock(): AST {
        return this._block;
    }
}
