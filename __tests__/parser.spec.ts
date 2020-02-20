import { Tokenizer } from "../src/tokenizer";
import { Parser } from "../src/parser";
import { BinOpAST } from "../src/ast/bin-op.ast";
import { NumberAST } from "../src/ast/number.ast";
import { PlusToken } from "../src/tokens/plus.token";
import { UnaryOpAST } from "../src/ast/unary-op.ast";
import { MinusToken } from "../src/tokens/minus.token";
import { IntegerConstToken } from "../src/tokens/integer-const.token";

describe.skip('Parser tests', () => {

    test('Add op AST', () => {
        const parser = new Parser(new Tokenizer('1 + 2'));
        const expectAST = new BinOpAST(
            new NumberAST(new IntegerConstToken(1)),
            new PlusToken(),
            new NumberAST(new IntegerConstToken(2)),
        );

        const result = parser.parse();

        expect(typeof result).toBe('object');
        expect(result).toEqual(expectAST);
    });

    test('Add op with unary AST', () => {
        const parser = new Parser(new Tokenizer('1 + - 2'));
        const expectAST = new BinOpAST(
            new NumberAST(new IntegerConstToken(1)),
            new PlusToken(),
            new UnaryOpAST(
                new MinusToken(),
                new NumberAST(new IntegerConstToken(2)),
            ),
        );

        const result = parser.parse();

        expect(typeof result).toBe('object');
        expect(result).toEqual(expectAST);
    });

});
