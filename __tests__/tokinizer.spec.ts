import { Tokenizer } from '../packages/tokenizer';

test('Read right', () => {
    const t = new Tokenizer('1+3');

    let currentT = t.getNextToken();
    expect(currentT.type).toEqual('NUMBER');
    expect(currentT.value).toEqual(1);

    currentT = t.getNextToken();
    expect(currentT.type).toEqual('PLUS');

    currentT = t.getNextToken();
    expect(currentT.type).toEqual('NUMBER');
    expect(currentT.value).toEqual(3);
});

test('Can skip whitespaces', () => {
    const t = new Tokenizer('1  + 3');

    let currentT = t.getNextToken();
    expect(currentT.type).toEqual('NUMBER');
    expect(currentT.value).toEqual(1);

    currentT = t.getNextToken();
    expect(currentT.type).toEqual('PLUS');

    currentT = t.getNextToken();
    expect(currentT.type).toEqual('NUMBER');
    expect(currentT.value).toEqual(3);
});

test('Can handle multidigit numbers', () => {
    const t = new Tokenizer('123 + 324');

    let currentT = t.getNextToken();
    expect(currentT.type).toEqual('NUMBER');
    expect(currentT.value).toEqual(123);

    currentT = t.getNextToken();
    expect(currentT.type).toEqual('PLUS');

    currentT = t.getNextToken();
    expect(currentT.type).toEqual('NUMBER');
    expect(currentT.value).toEqual(324);
});

test('Can handle minus', () => {
    const t = new Tokenizer('  123   -        324     ');

    let currentT = t.getNextToken();
    expect(currentT.type).toEqual('NUMBER');
    expect(currentT.value).toEqual(123);

    currentT = t.getNextToken();
    expect(currentT.type).toEqual('MINUS');

    currentT = t.getNextToken();
    expect(currentT.type).toEqual('NUMBER');
    expect(currentT.value).toEqual(324);
});

test('Unknown char throws exception', () => {
    const t = new Tokenizer('  123   *        324     ');

    const currentT = t.getNextToken();
    expect(currentT.type).toEqual('NUMBER');
    expect(currentT.value).toEqual(123);

    expect(() => t.getNextToken()).toThrowError(Error);
});

test('Expect that last token is EOF', () => {
    const tokenizer = new Tokenizer('  123   +        324     ');

    let token = tokenizer.getNextToken();
    expect(token.type).toEqual('NUMBER');
    expect(token.value).toEqual(123);

    token = tokenizer.getNextToken();
    expect(token.type).toEqual('PLUS');

    token = tokenizer.getNextToken();
    expect(token.type).toEqual('NUMBER');
    expect(token.value).toEqual(324);

    token = tokenizer.getNextToken();
    expect(token.type).toEqual('EOF');
});
