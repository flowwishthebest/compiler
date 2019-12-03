import {
    DIG_NINE,
    DIG_ZERO,
    LET_A_LOWER,
    LET_A_UPPER,
    LET_Z_LOWER,
    LET_Z_UPPER,
} from './constants';
import { ITokenFactory, TokenFactory } from './token.factory';

export class Lexer {
    private readonly tokenFactory: ITokenFactory = new TokenFactory();

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
