# Syntax description

## Technique: extended backus-naur form (EBNF)

program := declaration* EOF ;

declaration := variableDeclaration | statement ;

variableDeclaration := "var" IDENTIFIER (ASSIGN expression)? SEMICOLON ;

expression :=  assignment ;

assignment := IDENTIFIER ASSIGN assignment | logicOr;

logicOr := logicAnd ("or" logicAnd)* ;

logicAnd := equality ("and" equality)* ;

equality := comparison (("!=" | "==") comparison)* ;

comparison := addition (( ">" | ">=" | "<" | "<=") addition)* ;

addition := multiplication (( "-" | "+" ) multiplication)* ;

multiplication → unary (( "/" | "*" ) unary)* ;

unary := ("!" | "-") unary | primary ;

primary := "true"
    |"false"
    | "nil"
    | NUMBER
    | IDENTIFIER
    | setLiteral
    | arrayLiteral
    | "(" expression ")" ;

setLiteral := "{" expression { COMMA expression } "}" ;
arrayLiteral :+ "[" expression { COMMA expression } "]" ;

statement := expressionStmt | ifStmt | printStmt | whileStmt | block ;

expressionStatement := expression SEMICOLON ;

ifStatement := "if" "(" expression ")" statement ("else" statement)? ;

printStatement := "print" expression SEMICOLON ;

whileStatement := "while" "(" expression ")" statement ;

block := "{" declaration* "}" ;

NUMBER := DIGIT+ ("." DIGIT+)? ;

IDENTIFIER := ALPHA (ALPHA | DIGIT)* ;

ALPHA := "a"..."z" | "A"..."Z" | '_' ;

DIGIT := "0"..."9" ;

DOT = "." ;

ASSIGN := ":=" ;

SEMICOLON := ";" ;

COMMA := "," ;

singleLineComment := SLASH SLASH (NUMBER | ALPHA)? NEWLINE ;

SLASH := "/" ;
NEWLINE := "\n" ;

[X] операторы присвоения;
[X] условный оператор;
[X] оператор цикла;
[X] операторы ввода и вывода на экран;
[X] поддержка целочисленных, вещественных переменных;
[X] поддержка арифметических операций с числами;
[X] возможность написания комментариев.
поддержка одномерных числовых массивов;
