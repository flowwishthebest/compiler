import { Parser } from '../packages/parser';
import { Tokenizer } from '../packages/tokenizer';

test('Add op', () => {
    const parser = new Parser(new Tokenizer('1 + 2'));

    expect(parser.parse()).toEqual(3);
});

test('Subtract op', () => {
    const parser = new Parser(new Tokenizer('1 - 2'));

    expect(parser.parse()).toEqual(-1);
});

test('Unsupported op throw error', () => {
    const parser = new Parser(new Tokenizer('1 & 2'));

    let thrownError;
    try {
        parser.parse();
    } catch (err) {
        thrownError = err;
    }

    expect(thrownError).toBeDefined();
    expect(thrownError.message).toEqual('Unsupported token type &');
});

test('Can handle much operands', () => {
    const parser = new Parser(new Tokenizer('1 + 2 + 3 + 4'));

    expect(parser.parse()).toEqual(10);
});
