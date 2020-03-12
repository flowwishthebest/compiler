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
import { ProcedureCallAST } from "./ast/procedure-call.ast";
import { IfAST } from "./ast/if.ast";
import { WhileAST } from "./ast/while.ast";
import { ETokenType } from "./types";
import { LiteralAST } from "./ast/literal.ast";
import { ProgAST } from "./ast/prog.ast";
import { PrintAST } from "./ast/print.ast";
import { ExpressionAST } from "./ast/expression.ast";
import { CallStack } from "./call-stack";
import { ActivationRecord, EActiveRecordType } from "./activation-record";
import { VarDeclAST } from "./ast/var-decl.ast";
import { BlockStmtAST } from "./ast/block-stm.ast";

interface Options {
    shouldLogStack: boolean;
}

// TODO: runtime errors
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
        try {
            this.visit(this._tree);
        } catch (err) {
            console.log('RUNTIME ERROR', err);
        }
    }

    public visitProgAST(node: ProgAST): void {
        this._log(`Enter: Program`);
        
        const activationRecord = new ActivationRecord({
            name: 'global',
            type: EActiveRecordType.PROGRAM,
            nestingLevel: 1,
            enclosingAR: null,
        });

        this.CALL_STACK.push(activationRecord);

        for (const stmt of node.getStatements()) {
            this.visit(stmt);
        }

        this._log(`Leave: Program`);
        // this.CALL_STACK.print();
        this.CALL_STACK.pop();
    }

    public visitPrintAST(node: PrintAST): void {
        const expression = this.visit(node.getExpression());

        console.log(JSON.stringify(expression));
    }

    public visitExpressionAST(node: ExpressionAST): void {
        this.visit(node.getExpression());
    }

    public visitBinOpAST(node: BinOpAST): number | boolean {
        const left = node.getLeft();
        const right = node.getRight();
        const operator = node.getOperator();

        switch (operator.getType()) {
            case ETokenType.PLUS: {
                return this.visit(left) + this.visit(right);
            }
            case ETokenType.MINUS: {
                return this.visit(left) - this.visit(right);
            }
            case ETokenType.MUL: {
                return this.visit(left) * this.visit(right);
            }
            case ETokenType.FLOAT_DIV: {
                return this.visit(left) / this.visit(right);
            }
            case ETokenType.INTEGER_DIV: {
                return Math.trunc(this.visit(left) / this.visit(right));
            }
            case ETokenType.GREATER: {
                return this.visit(left) > this.visit(right);
            }
            case ETokenType.GREATER_EQUAL: {
                return this.visit(left) >= this.visit(right);
            }
            case ETokenType.LESS: {
                return this.visit(left) < this.visit(right);
            }
            case ETokenType.LESS_EQUAL: {
                return this.visit(left) <= this.visit(right);
            }
            case ETokenType.EQUAL_EQUAL: {
                return this.visit(left) == this.visit(right);
            }
            case ETokenType.BANG_EQUAL: {
                return this.visit(left) != this.visit(right);
            }
            default: {
                throw new Error(`Unknown op name ${operator.getType()}`);
            }
        }
    }

    public visitUnaryOpAST(node: UnaryOpAST): number | boolean {
        const right = node.getRight();

        switch (node.getOperator().getType()) {
            case ETokenType.BANG: {
                return !this._iftruthy(right);
            }
            case ETokenType.PLUS: {
                return +this.visit(right);
            }
            case ETokenType.MINUS: {
                return -this.visit(right);
            }
        }
    }
    
    public visitLiteralAST(node: LiteralAST): any {
        return node.getValue();
    }

    public visitNumberAST(node: NumberAST): number {
        return node.getToken().getValue();
    }

    public visitAssignAST(node: AssignAST): void {
        const variableName = node.getName();
        const variableValue = this.visit(node.getRight());

        const activationRecord = this.CALL_STACK.peek() as ActivationRecord;

        if (activationRecord.containsKey(variableName)) {
            activationRecord.set(variableName, variableValue);
            return variableValue;
        } else {
            throw new Error(
                `Runtime error. Undefined variable <${variableName}>`,
            );
        }
    }

    public visitVariableAST(node: VariableAST): number {
        const variableName = node.getName();

        const activationRecord = this.CALL_STACK.peek() as ActivationRecord;

        const value = activationRecord.get<number>(
            variableName,
            { checkEnclosing: true },
        );

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
            nestingLevel: 1,
            enclosingAR: null,
        });

        this.CALL_STACK.push(activationRecord);

        this.visit(node.getBlock());

        this._log(`Leave: Program ${programName}`);
        
        // this.CALL_STACK.print();

        this.CALL_STACK.pop();
    }

    public visitBlockAST(node: BlockAST): void {
        node.getDeclarations().forEach((d) => this.visit(d));
        this.visit(node.getCompoundStatement());
    }

    public visitVarDeclAST(node: VarDeclAST): void {
        let value = null;
        if (node.getInitializer()) {
            value = this.visit(node.getInitializer());
        }

        this.CALL_STACK.peek().set(node.getName(), value);
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

    public visitBlockStmtAST(node: BlockStmtAST): void {
        // TODO: environment
        const previous = this.CALL_STACK.peek();

        const ar = new ActivationRecord({
            name: 'block',
            type: EActiveRecordType.BLOCK,
            nestingLevel: previous.getNestingLevel() + 1,
            enclosingAR: previous,
        });

        ar.setEnclosingAR(previous);

        this.CALL_STACK.push(ar);

        node.getStatements().forEach((stmt) => {
            this.visit(stmt);
        });

        // this.CALL_STACK.print();

        this.CALL_STACK.pop();
    }

    public visitProcedureCallAST(node: ProcedureCallAST): void {
        const procedureName = node.getProcedureName();

        const ar = new ActivationRecord({
            name: procedureName,
            type: EActiveRecordType.BLOCK,
            nestingLevel: 2,
            enclosingAR: this.CALL_STACK.peek(),
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

        this.CALL_STACK.push(ar);

        this._log(`Enter: procedure ${procedureSymbol.getName()}`);
        // this.CALL_STACK.print();

        this.visit(procedureSymbol.getBlock());

        // this.CALL_STACK.print();
        this._log(`Leave: procedure ${procedureSymbol.getName()}`);

        this.CALL_STACK.pop();
    }

    public visitIfAST(node: IfAST): void {
        const cond = node.getCondition();
        const condValue = this.visit(cond);

        if (this._iftruthy(condValue)) {
            this.visit(node.getIfPart());
        } else if (node.getElsePart()) {
            this.visit(node.getElsePart());
        }

        return null;
        
    }

    public visitWhileAST(node: WhileAST): void {
        while (this.visit(node.getCondition())) {
            this.visit(node.getBlock());
        }
    }

    private _log(msg: string): void {
        if (this._options.shouldLogStack) {
            console.log(msg);
        }
    }

    private _iftruthy(val: any): boolean {
        return !!val;
    }
    
}