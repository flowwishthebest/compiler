import { ETokenType, IToken } from './token.interface';

export class Id implements IToken {
  public readonly value: string;
  public readonly type: ETokenType = ETokenType.ID;

  constructor(id: string) {
    this.value = id;
  }
}
