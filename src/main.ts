class Token implements IToken {
    constructor(
        public readonly tokenName: string,
        public readonly attributeValue?: any,
    ) {}
}

interface IToken {
    // Абстрактный символ использующийся во время синтаксического анализа
    tokenName: string;
    // Указывает на запись в таблице символов соответствующую данному токену
    attributeValue?: any;
}

enum EAbstractSymbol {
    ID = 'identifier',
    ASSIGN = '=',
}

const myToken = new Token(
    EAbstractSymbol.ID,
    1,
);

const assignToken = new Token(
    EAbstractSymbol.ASSIGN,
);

// таблица символов хранит для идентификатора его имя и тип
