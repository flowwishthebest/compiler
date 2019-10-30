__@bnf__

Предметная областб: множества

\<letter-uppercase> ::= A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z \
\<letter-lowercase> ::= a | b | c | d | e | f | g | h | i | j | k | l | m | n | o | p | q | r | s | t | u | v | w | x | y | z \
\<letter>           ::= \<letter-upppercase> | \<letter-lowercase> \
\<prefix-symb>      ::= _ | @ \
\<comma-symb>       ::= ','


\<identifier>       ::= [\<prefix-symb>] \<letter> { \<letter> | \<digit> } \
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


\<assignment-operator> ::= '=' \
\<assignment-expression>  ::= \<assignment-operator> \<assignment-expression>


\<declarator>           ::= \<type-qualifier> \<direct-declarator> \
\<type-qualifier>       ::= 'integer' | 'float' | 'boolean' | 'unknown' \
\<direct-declarator>    ::= \<identifier> | (\<declarator>) \ | \<direct-declarator> [ {\<constant-expression>}? ] \
\<declarator-statement> ::= \<declarator> | \<declarator> \<assignment-operator> \<initializer> \
\<initializer>          ::= \<assignment-expression>


\<primary-expression> ::= \<identifier> | \<constant> | (\<expression>) \
\<constant>           ::= \<integer-constant> | \<boolean-constant> | \<floating-constant> \
\<expression>         ::= \<assignment-expression> | \<expression> \<comma-symb> \<assignment-expression>


\<add-expr>            ::= \<multi-expr> | \<add-expr> + \<multi-expr> | \<add-expr> - \<multi-expr> \
\<multi-expr>          ::= \<multi-expr> * <cast-expr> | \<multi-expr> / \<cast-expr> \
\<constant-expression> ::= \<multi-expr> | \<add-expr>


\<statement>              ::= \<iteration-statement> | \<conditional-statement> \
\<statement-list>         ::= \<statement> { \<statement> }


\<iteration-statement>    ::= \<while-statement> \
\<while-statement>        ::= while (\<expression>) '{' \<statement-list> '}' 


\<conditional-statement>    ::= \<if-statement> \
\<if-statement>             ::= \<\_\_ifpart__>  { \<\_\_elseifpart__>  } [ \<\_\_elsepart__> ] \
\<\_\_ifpart__>             ::= if (\<expression>) '{' \<statement-list> '}' \
\<\_\_elseifpart__>         ::= else if (\<expression>) '{' \<statement-list> '}' \
\<\_\_elsepart__>           ::= else '{' \<statement-list> '}'

\<single-line-comment> ::= '//' \
\<text-comment>        ::= '\/\*' '\*\/'


\<reserved-words> ::=
  'false'   |
  'new'     |
  'null'    |
  'return'  |
  'true'    |
  'var'     |
  'for'     |
  'while'   |
  'integer' |
  'float'   |
  'boolean' |
  'unknown' |
  'else'    |
  'if'      |
