import { Parser } from './parser';
import { Tokenizer } from './tokenizer';
import { Interpreter } from './interpreter';

(function main(): number {
    const tokenizer = new Tokenizer('{ a:=1;b:=2;c:=a+b; };c * 10');
    const parser = new Parser(tokenizer);
    console.log(parser.parse());
    const interpreter = new Interpreter(parser);
    const res = interpreter.interpret();

    console.log(res);
    return res;
    // return interpreter.interpret();
})();
