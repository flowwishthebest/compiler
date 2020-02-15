import { Parser } from './parser';
import { Tokenizer } from './tokenizer';

function main(): number {
    const parser = new Parser(new Tokenizer('(1 + 2) * 3'));
    return parser.parse();
}

main();
