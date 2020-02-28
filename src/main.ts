import { Parser } from './parser';
import { Tokenizer } from './tokenizer';
import { Interpreter } from './interpreter';
import { SemanticAnalyzer } from './semantic-analyzer';
import * as Utils from 'util';

(function main(): any {
    const text = `
        program Main;
        var x, y: integer;
        procedure Alpha(a: integer; b: integer);
            var x: integer;
        {
            x := (a + b ) * 2;
        };
    
        { // main
            y := 7;
            x := (y + 3) * 3;
        } // main end.
    `;

    const lexer = new Tokenizer(text);
    const parser = new Parser(lexer);
    const tree = parser.parse();
    const semanticAnalyzer = new SemanticAnalyzer();
    semanticAnalyzer.visit(tree);

    const interpreter = new Interpreter(tree);
    interpreter.interpret();
    
    // console.log(Utils.inspect(tree, { depth: null }));
})();
