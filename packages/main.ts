import { Parser } from './parser';
import { Tokenizer } from './tokenizer';

function main() {
    const parser = new Parser(new Tokenizer('1 + 2 * 3 + 4'));
    debugger;
    parser.parse();
}

main();
