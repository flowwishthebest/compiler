import { And, False, If, True, While } from './tokens';
import { ETokenType, IToken } from './tokens/token.interface';

export interface ITokenFactory {
    create(type: ETokenType): IToken;
}

export class TokenFactory implements ITokenFactory {

    public create(type: ETokenType): IToken {
        switch (type) {
            case ETokenType.AND: {
                return new And();
            }
            case ETokenType.FALSE: {
                return new False();
            }
            case ETokenType.IF: {
                return new If();
            }
            case ETokenType.TRUE: {
                return new True();
            }
            case ETokenType.WHILE: {
                return new While();
            }
            default: {
                throw new Error(`Unknown token type <${type}>`);
            }
        }
    }
}
