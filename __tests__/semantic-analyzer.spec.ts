import { Tokenizer } from "../src/tokenizer";
import { Parser } from "../src/parser";
import { SemanticAnalyzer } from '../src/semantic-analyzer';

describe('Semantic analyzer tests', () => {
    test('Name error 1', () => {
        const program = `program NameError1; var a : integer; { a := 2 + b; }`;
        const tokenizer = new Tokenizer(program);
        const parser = new Parser(tokenizer);
        
        const ast = parser.parse();
        const symbolTableBuilder = new SemanticAnalyzer();
        
        try {
            symbolTableBuilder.visit(ast);
        } catch (err) {
            expect(err).toBeDefined();
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Name error: b');
        } 
    });

    test('Name error 2', () => {
        const program = `program NameError2;
            var b : integer;
            { b := 1; a := b + 2; }
        `;

        const tokenizer = new Tokenizer(program);
        const parser = new Parser(tokenizer);
        
        const ast = parser.parse();
        const symbolTableBuilder = new SemanticAnalyzer();
        
        try {
            symbolTableBuilder.visit(ast);
        } catch (err) {
            expect(err).toBeDefined();
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Name error: a');
        } 
    });
});
