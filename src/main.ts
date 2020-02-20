import { Parser } from './parser';
import { Tokenizer } from './tokenizer';
import { Interpreter } from './interpreter';

(function main(): any {
    const tokenizer = new Tokenizer(`
        program TokenizerTest;
        var a : integer; y : float;
        { // tokenizer test block. this line will be skipped
            a := 2;
            b := 10 * a + 10 * a div 4;
            y := 20 div 7 + 3.14;
        }  // tokenizer test block end. this line will be skipped to
    `);

    const parser = new Parser(tokenizer);
    const interpreter = new Interpreter(parser);

    interpreter.interpret();

    console.log('GLOBAL_SCOPE', interpreter.GLOABAL_SCOPE);
})();
