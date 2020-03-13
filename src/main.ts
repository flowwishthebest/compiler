import { Parser } from './parser';
import { Tokenizer } from './tokenizer';
import { Interpreter } from './interpreter';
import { SemanticAnalyzer } from './semantic-analyzer';
import * as Utils from 'util';
import { AnotherParser } from './another-parser';

// (function main(): any {
//     const text = `
//         program Main;
//         var z: integer;
//         procedure Alpha(a : integer; b : integer);
//             var x: integer;
//         {
//             x := (a + b ) * 2;
//         };
        
//         { // Main
//             z := 3;
//             while (z) {
//                 Alpha(3 + 5, 7);

//                 z := z - 1;
//             }
//         } //  Main end
//     `;

//     const lexer = new Tokenizer(text);
//     const parser = new Parser(lexer);
//     const tree = parser.parse();
//     const semanticAnalyzer = new SemanticAnalyzer();
//     semanticAnalyzer.visit(tree);

//     const interpreter = new Interpreter(tree);
//     interpreter.interpret();
// })();


// (function asd(): any {
//     const text = `
//         print((1+2)>-10);print(23+432);
//     `;

//     const scanner = new Tokenizer(text);

//     const parser = new AnotherParser(scanner);

//     const tree = parser.parse();
//     console.log(JSON.stringify(tree));

//     const interpreter = new Interpreter(tree, { shouldLogStack: true });
//     interpreter.interpret();
// })();

(function main(): any {
    const text = `
      var A := { 1, 2, 3, 4, 5 };
      var B := { 3, 4, 5 };
      print(A >= B) ;
    `;

    const scanner = new Tokenizer(text);

    const parser = new AnotherParser(scanner);

    const tree = parser.parse();

    // console.log(Utils.inspect(tree, { depth: null }));

    const interpreter = new Interpreter(tree);
    interpreter.interpret(); 
})();
