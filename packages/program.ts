import { Interpreter } from './interpreter';
import { Parser } from './parser';
import { Scanner } from './scanner';

export class App {
    private readonly CODE = '5 - - - 2';

    public main() {
        const scanner = new Scanner(this.CODE);
        const parser = new Parser(scanner);

        const interpreter = new Interpreter(parser);

        // tslint:disable-next-line:no-console
        console.log(interpreter.interpret());
    }
}

new App().main();
