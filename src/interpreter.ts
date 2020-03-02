import { FloatDivToken, MinusToken, MulToken, PlusToken } from "./tokens";
import { ASTVisitor } from "./ast-visitor";
import {
    UnaryOpAST,
    NumberAST,
    BinOpAST,
    CompoundAST,
    AssignAST,
    VariableAST,
    AST,
} from "./ast";
import { ProgramAST } from "./ast/program.ast";
import { BlockAST } from "./ast/block.ast";
import { IntegerDivToken } from "./tokens/integer-div.token";
import { CallStack, ActivationRecord, EActiveRecordType } from './stack';
import { ProcedureCallAST } from "./ast/procedure-call.ast";

interface Options {
    shouldLogStack: boolean;
}

export class Interpreter extends ASTVisitor {
    private readonly CALL_STACK: CallStack;

    constructor(
        private readonly _tree: AST,
        private readonly _options: Options = { shouldLogStack: true }
    ) {
        super();

        this.CALL_STACK = new CallStack();
    }

    public interpret(): void {
        return this.visit(this._tree);
    }

    public visitBinOpAST(node: BinOpAST): number {
        switch (node.getToken().constructor) {
            case PlusToken: {
                return this.visit(node.getLeft()) + this.visit(node.getRight());
            }
            case MinusToken: {
                return this.visit(node.getLeft()) - this.visit(node.getRight());
            }
            case MulToken: {
                return this.visit(node.getLeft()) * this.visit(node.getRight());
            }
            case FloatDivToken: {
                return this.visit(node.getLeft()) / this.visit(node.getRight());
            }
            case IntegerDivToken: {
                const result = this.visit(node.getLeft()) / this.visit(node.getRight());
                return Math.trunc(result);
            }
            default: {
                throw new Error(
                    `Unknown op name ${node.getToken().constructor.name}`,
                );
            }
        }
    }

    public visitNumberAST(node: NumberAST): number {
        return node.getToken().getValue();
    }

    public visitUnaryOpAST(node: UnaryOpAST): number {
        switch (node.getToken().constructor) {
            case PlusToken: {
                return +this.visit(node.getExpr());
            }
            case MinusToken: {
                return -this.visit(node.getExpr());
            }
        }
    }

    public visitAssignAST(node: AssignAST): void {
        const variableName = node.getLeft().getToken().getValue();
        const variableValue = this.visit(node.getRight());

        const activationRecord = this.CALL_STACK.peek() as ActivationRecord;

        activationRecord.set(variableName, variableValue);
    }

    public visitVariableAST(node: VariableAST): number {
        const variableName = node.getToken().getValue();

        const activationRecord = this.CALL_STACK.peek() as ActivationRecord;

        const value = activationRecord.get<number>(variableName);

        return value;
    }

    public visitCompoundAST(node: CompoundAST): void {
        node.getChildren().forEach((c) => this.visit(c));
    }

    public visitEmptyAST(/* node: EmptyAST */): void {
        return;
    }

    public visitProgramAST(node: ProgramAST): void {
        const programName = node.getToken().getValue();
        this._log(`Enter: Program ${programName}`);
        const activationRecord = new ActivationRecord({
            name: programName,
            type: EActiveRecordType.PROGRAM,
            nestingLevel: 1
        });

        this.CALL_STACK.push(activationRecord);

        this.visit(node.getBlock());

        this._log(`Leave: Program ${programName}`);
        this.CALL_STACK.print();

        this.CALL_STACK.pop();
    }

    public visitBlockAST(node: BlockAST): void {
        node.getDeclarations().forEach((d) => this.visit(d));
        this.visit(node.getCompoundStatement());
    }

    public visitVariableDeclarationAST(
        /* node: VariableDeclarationAST */
    ): void {
        // TODO:
        return;
    }
    
    public visitTypeAST(/* node: TypeAST */): void {
        return;
    }

    public visitProcedureDeclarationAST(
        /* node: ProcedureDeclarationAST, */
    ): void {
        return;
    }

    public visitProcedureCallAST(node: ProcedureCallAST): void {
        const procedureName = node.getProcedureName();

        const ar = new ActivationRecord({
            name: procedureName,
            type: EActiveRecordType.PROCEDURE,
            nestingLevel: 2,
        });

        const procedureSymbol = node.getProcedureSymbol();

        const [formalPamars, actualParams] = [
            procedureSymbol.getParams(),
            node.getParams(),
        ];

        formalPamars.forEach((v, idx) => {
            const name = v.getName();
            const val = actualParams[idx];
            const resutlValue = this.visit(val);

            ar.set(name, resutlValue);
        });

        console.log('AR', JSON.stringify(ar));

        this.CALL_STACK.push(ar);

        this._log(`Enter: procedure ${procedureSymbol.getName()}`);
        this.CALL_STACK.print();

        this.visit(procedureSymbol.getBlock());

        this.CALL_STACK.print();
        this._log(`Leave: procedure ${procedureSymbol.getName()}`);

        this.CALL_STACK.pop();
    }

    private _log(msg: string): void {
        if (this._options.shouldLogStack) {
            console.log(msg);
        }
    }
    
}