import * as Yargs from 'yargs';
import { Tokenizer } from './tokenizer';
import { Parser } from './parser';
import { SemanticAnalyzer } from './semantic-analyzer';
import { Interpreter } from './interpreter';
import { TokenizerError } from './errors/tokenizer.error';

Yargs
    .scriptName("Ilya compiler")
    .option("f", {
        alias: "file",
        describe: "Path to file with source code",
        nargs: 1,
        type: "string",
        required: false,
    })
    .option("c", {
        alias: "code",
        describe: "source code on ilya lang",
        type: "string",
        nargs: 1,
    })
    .describe("help", "Show help.")
    .describe("version", "Show version number")
    .epilog(`Copyright ${new Date().getFullYear()}`)
    .argv;


const { file, code } = Yargs.argv;

if (!code && !file) {
    Yargs.showHelp();
    process.exit(1);
}

if (code) {
    const tokenizer = new Tokenizer(code as string);
}