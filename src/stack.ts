export class Stack<T = any> {
   protected readonly _items: Array<T> = [];

    public push(item: T): this {
        this._items.push(item);
        return this;
    }
        

    public pop(): T {
        return this._items.pop();
    }
        

    public peek(): T {
        return this._items[this._items.length - 1];
    }
}

export enum EActiveRecordType {
    PROGRAM = 'PROGRAM',
}

interface KwArgs {
    name: string;
    type: EActiveRecordType;
    nestingLevel: number;
}

export class ActivationRecord {
    private readonly _members: Map<string, any> = new Map();
    private readonly _name: string;
    private readonly _type: EActiveRecordType;
    private readonly _nestingLevel: number;

    constructor(kwArgs: KwArgs) {
        this._name = kwArgs.name;
        this._type = kwArgs.type;
        this._nestingLevel = kwArgs.nestingLevel;
    }
    
    public getName(): string {
        return this._name;
    }

    public getType(): EActiveRecordType {
        return this._type;
    }

    public getNestingLevel(): number {
        return this._nestingLevel;
    }

    public set<T>(key: string, value: T): this {
        this._members.set(key, value);

        return this;
    }

    public get<T>(key: string): T {
        return this._members.get(key);
    }

    public toString(): string {
        const lines = [];
        for (const [k, v] of this._members.entries()) {
            lines.push(`  ${k}: ${v}`);
        }

        return lines.join('\n');
    }
}

export class CallStack extends Stack<ActivationRecord> {
    public print(): void  {
        const items = this._items.slice().reverse();

        const h1 = `${this.constructor.name}`;
        const lines = [h1, `${'='.repeat(h1.length)}`];

        for (let i = 0; i < items.length; i++) {
            const ar = items[i];

            const h2 = `${ar.getNestingLevel()} : ${ar.getType()} : ${ar.getName()}`;

            lines.push(h2);
            
            lines.push(ar.toString());

            lines.push(`${'-'.repeat(h2.length)}`);
        }

        console.log(lines.join('\n'));
    }
}
