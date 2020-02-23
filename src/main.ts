import { Parser } from './parser';
import { Tokenizer } from './tokenizer';
import { Interpreter } from './interpreter';
import { SymbolTableBuilder } from './symbol-table-builder';

(function main(): any {
    const tokenizer = new Tokenizer(`
        program Feature11;
        var a: integer;
    
        procedure p1;
        var a: float; k: integer;
    
        procedure p2;
        var a, z: integer;
        { // p2
            z := 777;
        }; // end p2
        
        { // p1
            
        }; // end p1
        
        { // Feature11
            a := 10;
        } // Feature1
    `);

    const symbolTableBuilder = new SymbolTableBuilder();
    const parser = new Parser(tokenizer);
    const tree = parser.parse();
    const interpreter = new Interpreter(tree);

    interpreter.interpret();
    symbolTableBuilder.visit(tree);

    console.log('GLOBAL_SCOPE', interpreter.getGlobalScope());
})();
