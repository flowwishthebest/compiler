import { Parser } from './parser';
import { Tokenizer } from './tokenizer';
import { Interpreter } from './interpreter';
import { SemanticAnalyzer } from './semantic-analyzer';

(function main(): any {
    const tokenizer = new Tokenizer(`
        program SymTab5;
        var x : integer; x : float; { x := x; }`);

    const semanticAnalyzer = new SemanticAnalyzer();
    const parser = new Parser(tokenizer);
    const tree = parser.parse();
    const interpreter = new Interpreter(tree);

    interpreter.interpret();
    semanticAnalyzer.visit(tree);

    console.log('GLOBAL_SCOPE', interpreter.getGlobalScope());
})();
