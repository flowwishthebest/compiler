import { EErrorType } from "../types/error.type";
import { Token } from "../tokens/token";

export class GeneralError extends Error {
    constructor(
        message: string,
        private readonly _type?: EErrorType,
        private readonly _token?: Token,
    ) {
        super(message);
    }
}