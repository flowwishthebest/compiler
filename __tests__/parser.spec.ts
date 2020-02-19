import { Tokenizer } from "../src/tokenizer";
import { Parser } from "../src/parser";
import { BinOpAST } from "../src/ast/bin-op.ast";
import { NumberAST } from "../src/ast/number.ast";
import { NumberToken } from "../src/tokens/number.token";
import { PlusToken } from "../src/tokens/plus.token";
import { UnaryOpAST } from "../src/ast/unary-op.ast";
import { MinusToken } from "../src/tokens/minus.token";

describe('Parser tests', () => {

    test('Add op AST', () => {
        const parser = new Parser(new Tokenizer('1 + 2'));
        const expectAST = new BinOpAST(
            new NumberAST(new NumberToken(1)),
            new PlusToken(),
            new NumberAST(new NumberToken(2)),
        );

        const result = parser.parse();

        expect(typeof result).toBe('object');
        expect(result).toEqual(expectAST);
    });

    test('Add op with unary AST', () => {
        const parser = new Parser(new Tokenizer('1 + - 2'));
        const expectAST = new BinOpAST(
            new NumberAST(new NumberToken(1)),
            new PlusToken(),
            new UnaryOpAST(
                new MinusToken(),
                new NumberAST(new NumberToken(2)),
            ),
        );

        const result = parser.parse();

        expect(typeof result).toBe('object');
        expect(result).toEqual(expectAST);
    });

});
