import { Parser } from '../src/parser';
import { Tokenizer } from '../src/tokenizer';
import { Interpreter } from '../src/interpreter';

describe('Interpreter tests', () => {
    test.skip('Can handle produre declaration properly', () => {
        const program = `
            program Feature11;
            var a: integer;
            
            procedure p1;
            var a: float; k: integer;
            
            procedure p2;
            var a, z: integer;
            { // p2
                z := 777;
            }; // end p2
            
            { // p1
            
            }; // end p1
            
            { // Feature11
                a := 10;
        } // Feature11`
        const parser = new Parser(new Tokenizer(program));
        const interpreter = new Interpreter(parser.parse());

        interpreter.interpret();

        // const globalScope = interpreter.getGlobalScope();

        // expect(globalScope.get('a')).toBeDefined();
        // expect(typeof globalScope.get('a')).toBe('number');
        // expect(globalScope.get('a')).toBe(10);
    });
    // TODO: actualize tests
    // test('Add op', () => {
    //     const parser = new Parser(new Tokenizer('1 + 2'));
    //     const interpreter = new Interpreter(parser);

    //     const result = interpreter.interpret();

    //     expect(typeof result).toBe('number');
    //     expect(result).toEqual(3);
    // });

    // test('Subtract op', () => {
    //     const parser = new Parser(new Tokenizer('1 - 2'));
    //     const interpreter = new Interpreter(parser);

    //     const result = interpreter.interpret();

    //     expect(typeof result).toBe('number');
    //     expect(result).toEqual(-1);
    // });

    // test('Unsupported op throw error', () => {
    //     const parser = new Parser(new Tokenizer('1 & 2'));
    //     const interpreter = new Interpreter(parser);

    //     let thrownError;
    //     try {
    //         interpreter.interpret();
    //     } catch (err) {
    //         thrownError = err;
    //     }

    //     expect(thrownError).toBeDefined();
    //     expect(thrownError.message).toEqual('Unsupported token type &');
    // });

    // test('Can handle much operands', () => {
    //     const parser = new Parser(new Tokenizer('1 + 2 + 3 + 4'));
    //     const interpreter = new Interpreter(parser);

    //     const result = interpreter.interpret();

    //     expect(typeof result).toBe('number');
    //     expect(result).toEqual(10);
    // });

    // test('Can handle much operands', () => {
    //     const parser = new Parser(new Tokenizer('1 + 2 * 3 + 4'));
    //     const interpreter = new Interpreter(parser);

    //     const result = interpreter.interpret();

    //     expect(typeof result).toBe('number');
    //     expect(result).toEqual(11);
    // });

    // test('Can handle much operands', () => {
    //     const parser = new Parser(new Tokenizer('1 + 2 * 20 + 4 / 4'));
    //     const interpreter = new Interpreter(parser);

    //     const result = interpreter.interpret();

    //     expect(typeof result).toBe('number');
    //     expect(result).toEqual(42);
    // });

    // test('Operators associativity', () => {
    //     const parser = new Parser(new Tokenizer('(1 + 2) * 20 + 4 / 4'));
    //     const interpreter = new Interpreter(parser);

    //     const result = interpreter.interpret();
        
    //     expect(typeof result).toBe('number');
    //     expect(result).toBe(61);
    // });

    // test('Unary operators', () => {
    //     const parser = new Parser(new Tokenizer('(1+2)*-10'));
    //     const interpreter = new Interpreter(parser);

    //     const result = interpreter.interpret();

    //     expect(typeof result).toBe('number');
    //     expect(result).toBe(-30);
    // });
});
