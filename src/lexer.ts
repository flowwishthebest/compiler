import {
    DIG_NINE,
    DIG_ZERO,
    LET_A_LOWER,
    LET_A_UPPER,
    LET_Z_LOWER,
    LET_Z_UPPER,
} from './constants';
import { ITokenFactory, TokenFactory } from './token.factory';
import { ETokenType, IToken } from './tokens/token.interface';

export class Lexer {
    private readonly tokenFactory: ITokenFactory = new TokenFactory();

    private readonly code: string;
    private readonly position: number;
    private readonly currCh: string;

    constructor(code: string) {
        if (!code.length) {
            throw new Error('Empty source code');
        }

        this.code = code;
        this.position = 0;
        this.currCh = this.code[this.position];
      }

    public getNextToken(): IToken {
        while (this.currCh !== null) {
            this.tokenFactory.create(this.currCh.toUpperCase() as any);
        }

        return this.tokenFactory.create(ETokenType.EOF);
      }

    private isDigit(char: string): boolean {
        return DIG_ZERO <= char && char <= DIG_NINE;
    }

    private isLetter(char: string): boolean {
        return LET_A_LOWER <= char &&
            char <= LET_Z_LOWER ||
            LET_A_UPPER <= char &&
            char <= LET_Z_UPPER;
    }

    private skipWhiteSpace(): void {
        // TODO:
    }
}
