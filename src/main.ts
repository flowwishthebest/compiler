import { Parser } from './parser';
import { Tokenizer } from './tokenizer';
import { Interpreter } from './interpreter';
import { SemanticAnalyzer } from './semantic-analyzer';
import * as Utils from 'util';

(function main(): any {
    const text = `
        program Main;
        var z: integer;
        procedure Alpha(a : integer; b : integer);
            var x: integer;
        {
            x := (a + b ) * 2;
        };
        
        { // Main
            z := 3;
            while (z) {
                Alpha(3 + 5, 7);

                z := z - 1;
            }
        } //  Main end
    `;

    const lexer = new Tokenizer(text);
    const parser = new Parser(lexer);
    const tree = parser.parse();
    const semanticAnalyzer = new SemanticAnalyzer();
    semanticAnalyzer.visit(tree);

    const interpreter = new Interpreter(tree);
    interpreter.interpret();
})();
