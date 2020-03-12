export enum EActiveRecordType {
    PROGRAM = 'PROGRAM',
    PROCEDURE = 'PROCEDURE',
    BLOCK = 'BLOCK'
}

interface KwArgs {
    name: string;
    type: EActiveRecordType;
    nestingLevel: number;
    enclosingAR: ActivationRecord;
}

export class ActivationRecord {
    private readonly _members: Map<string, any> = new Map();
    private readonly _name: string;
    private readonly _type: EActiveRecordType;
    private readonly _nestingLevel: number;
    private _enclosingAR: ActivationRecord;

    constructor(kwArgs: KwArgs) {
        this._name = kwArgs.name;
        this._type = kwArgs.type;
        this._nestingLevel = kwArgs.nestingLevel;
        this._enclosingAR = kwArgs.enclosingAR;
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

    public getEnclosingAR(): ActivationRecord | null {
        return this._enclosingAR;
    }

    public setEnclosingAR(v: ActivationRecord): this {
        this._enclosingAR = v;

        return this;
    }

    public set<T>(key: string, value: T): this {
        this._members.set(key, value);

        return this;
    }

    public get<T>(
        key: string,
        opts: { checkEnclosing: boolean } = { checkEnclosing: false },
    ): T {

        if (this._members.has(key)) {
            return this._members.get(key);
        }
        
        if (opts.checkEnclosing && this.getEnclosingAR()) {
            return this.getEnclosingAR().get(key, { checkEnclosing: true });
        }

        return null;
    }

    public containsKey(key: string): boolean {
        return this._members.has(key);
    }

    public toString(): string {
        const lines = [];
        for (const [k, v] of this._members.entries()) {
            lines.push(`  ${k}: ${v}`);
        }

        return lines.join('\n');
    }
}
