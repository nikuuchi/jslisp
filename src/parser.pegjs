
start
	= expression+

expression
	= "(" whitespace? expr:list ")" { return expr;}
	/ integer
	/ symbol

list
	= (l:expression whitespace? { return l; } )+

symbol
	= sym:[a-zA-Z]+ { return sym.join(""); }
	/ operator
	/ integer

operator
	= "+"
	/ "-"
	/ "*"
	/ "/"
	/ "%"
	/ "<="
	/ "<"

integer "integer"
	= digits:[0-9]+ { return parseInt(digits.join(""), 10); }

whitespace
	= [ \t\r]

newline
	= [\n]
