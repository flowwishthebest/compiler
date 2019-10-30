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
\<if-statement>           ::= \<__ifpart__>  { \<__elseifpart__>  } { \<__elsepart__> } \
\<__ifpart__>             ::= if (\<expression>) '{' \<statement-list> '}' \
\<__elseifpart__>         ::= else if (\<expression>) '{' \<statement-list> '}' \
\<__elsepart__>           ::= else '{' \<statement-list> '}'


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


Зарезервированные слова:

операторы присвоения;
условный оператор;
оператор цикла;

операторы ввода и вывода на экран;
[X] поддержка целочисленных, вещественных переменных;
поддержка арифметических операций с числами;
поддержка одномерных числовых массивов;
возможность написания комментариев.

---

\<exp-symb> ::= 'e' | 'E'

\<floatnumber>   ::=  pointfloat | exponentfloat
\<pointfloat>    ::=  [intpart] fraction | intpart "."
\<exponentfloat> ::=  (intpart | pointfloat) exponent
