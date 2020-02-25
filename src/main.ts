import { Parser } from './parser';
import { Tokenizer } from './tokenizer';
import { Interpreter } from './interpreter';
import { SemanticAnalyzer } from './semantic-analyzer';

// (function main(): any {
//     const tokenizer = new Tokenizer(`
//         program SymTab5;
//         var x : integer; x : float; { x := x; }`);

//     const semanticAnalyzer = new SemanticAnalyzer();
//     const parser = new Parser(tokenizer);
//     const tree = parser.parse();
//     const interpreter = new Interpreter(tree);

//     interpreter.interpret();
//     semanticAnalyzer.visit(tree);

//     console.log('GLOBAL_SCOPE', interpreter.getGlobalScope());
// })();


// (function a(): any {
//     const text = `
//         program Main;
//         var x, y : float;

//         procedure Alpha(a: integer);
//             var y: integer;
//         {};

//         { // Main

//         } // end Main;`;

//     const lexer = new Tokenizer(text);
//     const parser = new Parser(lexer);
//     const tree = parser.parse();
//     const semanticAnalyzer = new SemanticAnalyzer();
//     semanticAnalyzer.visit(tree);

//     // console.log(semanticAnalyzer._scope.print());
// })();


(function b(): any {
    const text = `
        program Main;
        var x, y: float;
        procedure Alpha(a: integer);
            var y: integer;
        {
            x := a + x + y;
        };
        {

        }
    `;

    const lexer = new Tokenizer(text);
    const parser = new Parser(lexer);
    const tree = parser.parse();
    const semanticAnalyzer = new SemanticAnalyzer();
    semanticAnalyzer.visit(tree);
})();