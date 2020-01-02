import { Interpreter } from './interpreter/interpreter';
import { Parser } from './parser/parser';
import { Scanner } from './scanner';

export class App {
    private readonly CODE = '16 * 10 / 3 + 15';

    public main() {
        const scanner = new Scanner(this.CODE);
        const parser = new Parser(scanner);

        const interpreter = new Interpreter(parser);

        // tslint:disable-next-line:no-console
        console.log(interpreter.interpret());
    }
}

new App().main();
