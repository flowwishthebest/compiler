import { Tokenizer } from '../packages/tokenizer';

test('Read right', () => {
    const tokenizer = new Tokenizer('1+3');

    let token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('NUMBER');
    expect(token.getValue()).toEqual(1);

    token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('PLUS');

    token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('NUMBER');
    expect(token.getValue()).toEqual(3);
});

test('Can skip whitespaces', () => {
    const tokenizer = new Tokenizer('1  + 3');

    let token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('NUMBER');
    expect(token.getValue()).toEqual(1);

    token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('PLUS');

    token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('NUMBER');
    expect(token.getValue()).toEqual(3);
});

test('Can handle multidigit numbers', () => {
    const tokenizer = new Tokenizer('123 + 324');

    let token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('NUMBER');
    expect(token.getValue()).toEqual(123);

    token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('PLUS');

    token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('NUMBER');
    expect(token.getValue()).toEqual(324);
});

test('Can handle minus', () => {
    const tokenizer = new Tokenizer('  123   -        324     ');

    let token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('NUMBER');
    expect(token.getValue()).toEqual(123);

    token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('MINUS');

    token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('NUMBER');
    expect(token.getValue()).toEqual(324);
});

test('Unknown char throws exception', () => {
    const tokenizer = new Tokenizer('  123   &        324     ');

    const token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('NUMBER');
    expect(token.getValue()).toEqual(123);

    expect(() => tokenizer.getNextToken()).toThrowError(Error);
});

test('Expect that last token is EOF', () => {
    const tokenizer = new Tokenizer('  123   +        324     ');

    let token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('NUMBER');
    expect(token.getValue()).toEqual(123);

    token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('PLUS');

    token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('NUMBER');
    expect(token.getValue()).toEqual(324);

    token = tokenizer.getNextToken();
    expect(token.getType()).toEqual('EOF');
});
