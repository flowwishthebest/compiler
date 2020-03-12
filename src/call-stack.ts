import { Stack } from "./stack";
import { ActivationRecord } from "./activation-record";

export class CallStack extends Stack<ActivationRecord> {
    public print(): void  {
        const items = this._items.slice().reverse();

        const h1 = `${this.constructor.name}`;
        const lines = [h1, `${'='.repeat(h1.length)}`];

        for (let i = 0; i < items.length; i++) {
            const ar = items[i];

            const nestingLevel = ar.getNestingLevel();
            const type = ar.getType();
            const name = ar.getName();

            const h2 = `${nestingLevel} : ${type} : ${name}`;

            lines.push(h2);
            lines.push(ar.toString());
            lines.push(`${'-'.repeat(h2.length)}`);
        }

        console.log(lines.join('\n'));
    }
}
