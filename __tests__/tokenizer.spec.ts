import { Tokenizer } from '../src/tokenizer';
import { ETokenType } from '../src/types';
import {
    PlusToken,
    MinusToken,
    MulToken,
    FloatDivToken,
    EOFToken,
    LParenToken,
    RParenToken,
    IdToken,
    SemicolonToken,
    LBracketToken,
    AssignToken,
    RBracketToken,
    IntegerConstToken,
    ColonToken,
    IntegerTypeToken,
} from '../src/tokens';
import { ProcedureToken } from '../dist/tokens/procedure.token';

describe('Tokenizer tests', () => {
    test('Recognize simplest expression', () => {
        const tokenizer = new Tokenizer('1+3');

        let token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(1));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(1);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new PlusToken());
        expect(token.getType()).toBe(ETokenType.PLUS);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(3));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(3);
    });

    test('Can skip whitespaces', () => {
        const tokenizer = new Tokenizer('1  + 3');

        let token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(1));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(1);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new PlusToken());
        expect(token.getType()).toBe(ETokenType.PLUS);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(3));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(3);
    });

    test('Can handle multidigit numbers', () => {
        const tokenizer = new Tokenizer('123 + 324');

        let token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(123));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(123);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new PlusToken());
        expect(token.getType()).toBe(ETokenType.PLUS);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(324));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(324);
    });

    test('Can handle minus', () => {
        const tokenizer = new Tokenizer('  123   -        324     ');

        let token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(123));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(123);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new MinusToken());
        expect(token.getType()).toBe(ETokenType.MINUS);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(324));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(324);
    });

    test('Can handle mul', () => {
        const tokenizer = new Tokenizer('  123   *        324     ');
        let token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(123));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(123);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new MulToken());
        expect(token.getType()).toBe(ETokenType.MUL);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(324));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(324);
    });

    test('Can handle div', () => {
        const tokenizer = new Tokenizer('  123   /        324     ');

        let token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(123));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(123);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new FloatDivToken());
        expect(token.getType()).toBe(ETokenType.FLOAT_DIV);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(324));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(324);
    });

    test('Unknown char throws exception', () => {
        const tokenizer = new Tokenizer('  123   &        324     ');

        const token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(123));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(123);

        // TODO: Parse the error in detail
        expect(() => tokenizer.getNextToken()).toThrowError(Error);
    });

    test('Expect that last token is EOF', () => {
        const tokenizer = new Tokenizer('  123   +        324     ');

        let token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(123));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(123);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new PlusToken());
        expect(token.getType()).toBe(ETokenType.PLUS);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(324));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(324);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new EOFToken());
        expect(token.getType()).toBe(ETokenType.EOF);
    });

    test('Can handle multiple factors', () => {
        const tokenizer = new Tokenizer('  123   -        324    * 435   ');

        let token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(123));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(123);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new MinusToken());
        expect(token.getType()).toBe(ETokenType.MINUS);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(324));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(324);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new MulToken());
        expect(token.getType()).toBe(ETokenType.MUL);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(435));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(435);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new EOFToken());
        expect(token.getType()).toBe(ETokenType.EOF);
    });

    test('Can handle multiple factors', () => {
        const tokenizer = new Tokenizer('  (  123   -     324  )  * 435   ');

        let token = tokenizer.getNextToken();
        expect(token).toEqual(new LParenToken());
        expect(token.getType()).toBe(ETokenType.LPAREN);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(123));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(123);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new MinusToken());
        expect(token.getType()).toBe(ETokenType.MINUS);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(324));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(324);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new RParenToken());
        expect(token.getType()).toBe(ETokenType.RPAREN);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new MulToken());
        expect(token.getType()).toBe(ETokenType.MUL);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(435));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(435);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new EOFToken());
        expect(token.getType()).toBe(ETokenType.EOF);
    });

    test('Can recognize brackets', () => {
        const tokenizer = new Tokenizer('{}');

        let token = tokenizer.getNextToken();
        expect(token).toEqual(new LBracketToken());
        expect(token.getType()).toBe(ETokenType.LBRACKET);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new RBracketToken());
        expect(token.getType()).toBe(ETokenType.RBRACKET);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new EOFToken());
        expect(token.getType()).toBe(ETokenType.EOF);
    });

    test('Can recognize assign', () => {
        const tokenizer = new Tokenizer('{ := }');

        let token = tokenizer.getNextToken();
        expect(token).toEqual(new LBracketToken());
        expect(token.getType()).toBe(ETokenType.LBRACKET);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new AssignToken);
        expect(token.getType()).toBe(ETokenType.ASSIGN);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new RBracketToken());
        expect(token.getType()).toBe(ETokenType.RBRACKET);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new EOFToken());
        expect(token.getType()).toBe(ETokenType.EOF);
    });

    test('Can recognize hard expr', () => {
        const tokenizer = new Tokenizer('{ age := 18; count :=42 ; }');

        let token = tokenizer.getNextToken();
        expect(token).toEqual(new LBracketToken());
        expect(token.getType()).toBe(ETokenType.LBRACKET);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IdToken('age'));
        expect(token.getType()).toBe(ETokenType.ID);
        expect(token.getValue()).toBe('age');

        token = tokenizer.getNextToken();
        expect(token).toEqual(new AssignToken);
        expect(token.getType()).toBe(ETokenType.ASSIGN);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(18));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(18);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new SemicolonToken());
        expect(token.getType()).toBe(ETokenType.SEMICOLON);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IdToken('count'));
        expect(token.getType()).toBe(ETokenType.ID);
        expect(token.getValue()).toBe('count');

        token = tokenizer.getNextToken();
        expect(token).toEqual(new AssignToken);
        expect(token.getType()).toBe(ETokenType.ASSIGN);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(42));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(42);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new SemicolonToken());
        expect(token.getType()).toBe(ETokenType.SEMICOLON);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new RBracketToken());
        expect(token.getType()).toBe(ETokenType.RBRACKET)

        token = tokenizer.getNextToken();
        expect(token).toEqual(new EOFToken());
        expect(token.getType()).toBe(ETokenType.EOF);
    });

    test('Will skip comments "// comment"', () => {
        const tokenizer = new Tokenizer(
            `{// My single line comment;
            a := 123;}`
        );

        let token = tokenizer.getNextToken();
        expect(token).toEqual(new LBracketToken());
        expect(token.getType()).toBe(ETokenType.LBRACKET);

        token = tokenizer.getNextToken();
        expect(token.getType()).toBe('ID');
        expect(token.getValue()).toBe('a');

        token = tokenizer.getNextToken();
        expect(token).toEqual(new AssignToken);
        expect(token.getType()).toBe(ETokenType.ASSIGN);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(123));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(123);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new SemicolonToken());
        expect(token.getType()).toBe(ETokenType.SEMICOLON);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new RBracketToken());
        expect(token.getType()).toBe(ETokenType.RBRACKET);
        
        token = tokenizer.getNextToken();
        expect(token).toEqual(new EOFToken());
        expect(token.getType()).toBe(ETokenType.EOF);
    });

    test('Can recognize colon and type tokens', () => {
        const tokenizer = new Tokenizer(`{ a: integer := 123; }`);

        let token = tokenizer.getNextToken();
        expect(token).toEqual(new LBracketToken());
        expect(token.getType()).toBe(ETokenType.LBRACKET);

        token = tokenizer.getNextToken();
        expect(token.getType()).toBe(ETokenType.ID);
        expect(token.getValue()).toBe('a');

        token = tokenizer.getNextToken();
        expect(token).toEqual(new ColonToken());
        expect(token.getType()).toBe(ETokenType.COLON);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerTypeToken());
        expect(token.getType()).toBe(ETokenType.INTEGER);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new AssignToken);
        expect(token.getType()).toBe(ETokenType.ASSIGN);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new IntegerConstToken(123));
        expect(token.getType()).toBe(ETokenType.INTEGER_CONST);
        expect(token.getValue()).toBe(123);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new SemicolonToken());
        expect(token.getType()).toBe(ETokenType.SEMICOLON);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new RBracketToken());
        expect(token.getType()).toBe(ETokenType.RBRACKET);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new EOFToken());
        expect(token.getType()).toBe(ETokenType.EOF);
    });

    test('can recognize procedure token', () => {
        const tokenizer = new Tokenizer(`procedure p1;`);

        let token = tokenizer.getNextToken();
        expect(token).toEqual(new ProcedureToken());
        expect(token.getType()).toBe(ETokenType.PROCEDURE);

        token = tokenizer.getNextToken();
        expect(token.getType()).toBe(ETokenType.ID);
        expect(token.getValue()).toBe('p1');

        token = tokenizer.getNextToken();
        expect(token).toEqual(new SemicolonToken());
        expect(token.getType()).toBe(ETokenType.SEMICOLON);

        token = tokenizer.getNextToken();
        expect(token).toEqual(new EOFToken());
        expect(token.getType()).toBe(ETokenType.EOF);
    });
});
