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
import { LogicalAST } from "./ast/logical.ast";
import { SetAST } from "./ast/set.ast";
import {
    setUnion,
    setDifference,
    setIsSuperset,
    setEquality,
    setIsSubset,
    setIntersection,
    setSymmetricDifference,
} from "./utils/set";
import { ArrayAST } from "./ast/array.ast";
import { CallAST } from "./ast/call.ast";

interface Options {
    shouldLogStack: boolean;
}

// TODO: runtime errors
export class Interpreter extends ASTVisitor {
    private readonly CALL_STACK: CallStack;

    constructor(
        private readonly _tree: AST,
        private readonly _options: Options = { shouldLogStack: false }
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
        });

        // TODO: remove from there

        activationRecord.set('timeNow', () => Math.floor(Date.now() / 1000));

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
        
        console.log(require('util').inspect(expression, { depth: null }));
    }

    public visitExpressionAST(node: ExpressionAST): void {
        this.visit(node.getExpression());
    }

    public visitBinOpAST(node: BinOpAST): number | boolean | Set<any> {
        const left = node.getLeft();
        const right = node.getRight();
        const operator = node.getOperator();

        switch (operator.getType()) {
            case ETokenType.PLUS: {
                return this.visit(left) + this.visit(right);
            }
            case ETokenType.MINUS: {
                const a = this.visit(left);
                const b = this.visit(right);

                if (a instanceof Set && b instanceof Set) {
                    return setDifference(a, b);
                }

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
                const a = this.visit(left);
                const b = this.visit(right);

                if (a instanceof Set && b instanceof Set) {
                    return setIsSuperset(a, b) && !setEquality(a, b);
                }

                return this.visit(left) > this.visit(right);
            }
            case ETokenType.GREATER_EQUAL: {
                const a = this.visit(left);
                const b = this.visit(right);

                if (a instanceof Set && b instanceof Set) {
                    return setIsSuperset(a, b);
                }

                return this.visit(left) >= this.visit(right);
            }
            case ETokenType.LESS: {
                const a = this.visit(left);
                const b = this.visit(right);

                if (a instanceof Set && b instanceof Set) {
                    return setIsSubset(a, b) && !setEquality(a, b);
                }

                return this.visit(left) < this.visit(right);
            }
            case ETokenType.LESS_EQUAL: {
                const a = this.visit(left);
                const b = this.visit(right);

                if (a instanceof Set && b instanceof Set) {
                    return setIsSubset(a, b);
                }

                return this.visit(left) <= this.visit(right);
            }
            case ETokenType.EQUAL_EQUAL: {
                return this.visit(left) == this.visit(right);
            }
            case ETokenType.BANG_EQUAL: {
                return this.visit(left) != this.visit(right);
            }
            case ETokenType.BAR: {
                const a = this.visit(left);
                const b = this.visit(right);

                if (a instanceof Set && b instanceof Set) {
                    return setUnion(a, b);
                }

                throw new Error('Runtime error. Not correct operands for BAR op');
            }
            case ETokenType.AMPERSAND: {
                const a = this.visit(left);
                const b = this.visit(right);

                if (a instanceof Set && b instanceof Set) {
                    return setIntersection(a, b);
                }

                throw new Error('Runtime error. Not correct operands for AMPERSAND op');
            }
            case ETokenType.CARET: {
                const a = this.visit(left);
                const b = this.visit(right);

                if (a instanceof Set && b instanceof Set) {
                    return setSymmetricDifference(a, b);
                }

                throw new Error('Runtime error. Not correct operands for CARET op');
            }
            default: {
                throw new Error(`Unknown op name ${operator.getType()}`);
            }
        }
    }

    public visitArrayAST(node: ArrayAST): Array<any> {
        return node.getElements().map((n) => this.visit(n));
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

        const ar = this.CALL_STACK.peek().containsKey(variableName);

        if (ar) {
            ar.set(variableName, variableValue);
        } else {
            throw new Error(
                `Runtime error. Undefined variable <${variableName}>`,
            );
        }
    }

    public visitVariableAST(node: VariableAST): number {
        const variableName = node.getName();

        const ar = this.CALL_STACK.peek().containsKey(variableName);

        if (ar) {
            return ar.get(variableName);
        } else {
            throw new Error('Runtime error. Variable not found: ' + variableName);
        }
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

        const ar = this.CALL_STACK.peek();

        ar.set(node.getName(), value);
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
        const condition = this.visit(node.getCondition());

        if (this._iftruthy(condition)) {
            this.visit(node.getIfPart());
        } else if (node.getElsePart()) {
            this.visit(node.getElsePart());
        }

        return null;
    }

    public visitLogicalAST(node: LogicalAST): void {
        const left = this.visit(node.getLeft());

        if (node.getOperator().getType() === ETokenType.OR) {
            if (this._iftruthy(left)) {
                return left;
            }
        } else {
            if (!this._iftruthy(left)) {
                return left;
            }
        }

        return this.visit(node.getRight());
    }

    public visitSetAST(node: SetAST): Set<any> {
        const h =  node.getElements().map((n) => {
            return this.visit(n);
        });

        return new Set(h);
    }

    public visitWhileAST(node: WhileAST): void {
        while (this._iftruthy(this.visit(node.getCondition()))) {
            this.visit(node.getBody());
        }
    }

    public visitCallAST(node: CallAST): void {
        const calle = this.visit(node.getCalle()) as Function;

        const args = [];
        for (const arg of node.getArguments()) {
            args.push(this.visit(arg));
        }

        if (!calle.call) {
            throw new Error('Runtime error. Can only call funcs');
        }

        // TODO: check arity ??? args.len !== calle.declaredArgs ?

        return calle.call(this, args);
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
