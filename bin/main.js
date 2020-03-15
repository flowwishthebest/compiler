#!/usr/bin/env node

/* eslint-disable */

const fs = require('fs');

const { Tokenizer} = require('../dist/tokenizer');
const { AnotherParser } = require('../dist/another-parser');
const { Interpreter } = require('../dist/interpreter');


function main() {
    const [,, filepath] = process.argv;

    if (!filepath) {
        throw new Error('Usage ilia <filename>.ilia');
    }

    const resolvedFilepath = fs.realpathSync(filepath);

    const code = fs.readFileSync(resolvedFilepath, { encoding: 'utf8' });

    const tokenizer = new Tokenizer(code);
    const parser = new AnotherParser(tokenizer);

    const tree = parser.parse();

    const intepereter = new Interpreter(tree);

    intepereter.interpret();
}

main();