__Syntax BNF__

\<letter-uppercase> ::= A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z \
\<letter-lowercase> ::= a | b | c | d | e | f | g | h | i | j | k | l | m | n | o | p | q | r | s | t | u | v | w | x | y | z \
\<letter>           ::= \<letter-upppercase> | \<letter-lowercase> \
\<prefix-symb>      ::= _ | @ \
\<comma-symb>       ::= ','


\<identifier> ::= [\<prefix-symb>] \<letter> { \<letter> | \<digit> } \
\<identifier-list>  ::=  \<identifier> {\<comma-symb> \<identifier> }


\<digit>          ::= '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' \
\<dot-symb>       ::= '.' \
\<plus-symb>      ::= '+' \
\<minus-symb>     ::= '-' \
\<exp-symb>       ::= 'E' | 'e'


\<integer-part>        ::=  \<digit> { \<digit> }\
\<integer>             ::=  [\<plus-symb> | \<minus-symb>] \<integer-part> \
\<fraction>            ::=  \<dot-symb> \<intpart> \
\<exponent>            ::=  \<exp-symb> \<integer> \
\<point-float>         ::=  \<integer> \<fraction> | \<integer> \<dot> \
\<exponent-float>      ::=  (\<integer> | \<point-float>) \<exponent>


\<expression>  ::=

\<assignment-operator> ::= '='
\<assignment-expression>  ::= \<assignment-operator> \<assignment-expression>


\<statement>              ::= \<iteration-statement> | \<conditional-statement> \
\<statement-list>         ::= \<statement> { \<statement> } \
\<iteration-statement>    ::= \<while-statement> \
\<conditional-statement>  ::= \<if-statement> \
\<while-statement>        ::= while (\<expression>) '{' \<statement-list> '}' \
\<if-statement>           ::= \<\_\_ifpart__>  { \<\_\_elseifpart__>  } [ \<\_\_elsepart__> ] \
\<\_\_ifpart__>             ::= if (\<expression>) '{' \<statement-list> '}' \
\<\_\_elseifpart__>         ::= else if (\<expression>) '{' \<statement-list> '}' \
\<\_\_elsepart__>           ::= else '{' \<statement-list> '}'


\<reserved-words> ::= 'false' | 'new' | 'null' | 'return' | 'true' | 'var' | 'for' | 'while' | 'integer' | 'float' | 'boolean' | 'unknown' |  'else' | 'if'





<assignment-expression> ::= <conditional-expression>
                          | <unary-expression> <assignment-operator> <assignment-expression>

<assignment-operator> ::= =
                        | *=
                        | /=
                        | %=
                        | +=
                        | -=
                        | <<=
                        | >>=
                        | &=
                        | ^=
                        | |=


[ ] операторы присвоения;
[X] условный оператор;
[X] оператор цикла;

[ ] операторы ввода и вывода на экран;
[X] поддержка целочисленных, вещественных переменных;
[ ] поддержка арифметических операций с числами;
[ ] поддержка одномерных числовых массивов;
[ ] возможность написания комментариев.
