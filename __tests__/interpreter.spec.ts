/**
 * test(description, function testFunction() {
 *  // arrange
 *
 *  // act
 *
 *  // assert
 *
 * });
 */

import { Parser } from '../src/parser';
import { Tokenizer } from '../src/tokenizer';
import { Interpreter } from '../src/interpreter';

describe('Parser tests', () => {
    test('Add op', () => {
        const parser = new Parser(new Tokenizer('1 + 2'));
        const interpreter = new Interpreter(parser);

        const result = interpreter.interpret();

        expect(result).toEqual(3);
    });

    test('Subtract op', () => {
        const parser = new Parser(new Tokenizer('1 - 2'));
        const interpreter = new Interpreter(parser);

        const result = interpreter.interpret();

        expect(result).toEqual(-1);
    });

    test('Unsupported op throw error', () => {
        const parser = new Parser(new Tokenizer('1 & 2'));
        const interpreter = new Interpreter(parser);

        let thrownError;
        try {
            interpreter.interpret();
        } catch (err) {
            thrownError = err;
        }

        expect(thrownError).toBeDefined();
        expect(thrownError.message).toEqual('Unsupported token type &');
    });

    test('Can handle much operands', () => {
        const parser = new Parser(new Tokenizer('1 + 2 + 3 + 4'));
        const interpreter = new Interpreter(parser);

        const result = interpreter.interpret();

        expect(result).toEqual(10);
    });

    test('Can handle much operands', () => {
        const parser = new Parser(new Tokenizer('1 + 2 * 3 + 4'));
        const interpreter = new Interpreter(parser);

        const result = interpreter.interpret();

        expect(result).toEqual(11);
    });

    test('Can handle much operands', () => {
        const parser = new Parser(new Tokenizer('1 + 2 * 20 + 4 / 4'));
        const interpreter = new Interpreter(parser);

        const result = interpreter.interpret();

        expect(result).toEqual(42);
    });

    test('Operators associativity', () => {
        const parser = new Parser(new Tokenizer('(1 + 2) * 20 + 4 / 4'));
        const interpreter = new Interpreter(parser);

        const result = interpreter.interpret();

        expect(result).toEqual(61);
    });
});
