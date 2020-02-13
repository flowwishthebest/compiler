import { UnknownKeywordError } from '../unknown-keyword.error';
import { UnknownSymbolError } from '../unknown-symbol.error';
import { DivToken } from './div.token';
import { DoToken } from './do.token';
import { ElseToken } from './else.token';
import { EofToken } from './eof.token';
import { EqualToken } from './equal.token';
import { FalseToken } from './false.token';
import { IdentToken } from './ident.token';
import { IfToken } from './if.token';
import { IntegerToken } from './interger.token';
import { LBraToken } from './lbra.token';
import { LessToken } from './less.token';
import { LParToken } from './lpar.token';
import { MinusToken } from './minus.token';
import { MulToken } from './mul.token';
import { PlusToken } from './plus.token';
import { RBraToken } from './rbra.token';
import { RParToken } from './rpar.token';
import { SemicolonToken } from './semicolon.token';
import { IToken } from './token.interface';
import { TrueToken } from './true.token';
import { WhileToken } from './while.token';

export class TokenFactory {

    public createKeywordToken(kw: string): IToken {
        switch (kw) {
            case 'if': { return new IfToken(); }
            case 'else': { return new ElseToken(); }
            case 'do': { return new DoToken(); }
            case 'while': { return new WhileToken(); }
            case 'true': { return new TrueToken(); }
            case 'false': { return new FalseToken(); }
            default: { throw new UnknownKeywordError(kw); }
        }
    }

    public createSymbolToken(symb: string): IToken {
        switch (symb) {
            case '{': { return new LBraToken(); }
            case '}': { return new RBraToken(); }
            case ';': { return new SemicolonToken(); }
            case '(': { return new LParToken(); }
            case ')': { return new RParToken(); }
            case '+': { return new PlusToken(); }
            case '-': { return new MinusToken(); }
            case '<': { return new LessToken(); }
            case '=': { return new EqualToken(); }
            case '*': { return new MulToken(); }
            case '/': { return new DivToken(); }
            default: { throw new UnknownSymbolError(symb); }
        }
    }

    public createEof(): IToken {
        return new EofToken();
    }

    public createNum(value: number): IToken {
        return new IntegerToken(value);
    }

    public createIdent(value: string): IToken {
        return new IdentToken(value);
    }
}
