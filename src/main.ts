import { Parser } from './parser';
import { Tokenizer } from './tokenizer';
import { Interpreter } from './interpreter';

(function main(): number {
    const tokenizer = new Tokenizer('(1 + 2) * -10');
    const parser = new Parser(tokenizer);
    const interpreter = new Interpreter(parser);

    return interpreter.interpret();
})();
