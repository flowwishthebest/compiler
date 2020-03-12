export enum EActiveRecordType {
    PROGRAM = 'PROGRAM',
    PROCEDURE = 'PROCEDURE',
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
