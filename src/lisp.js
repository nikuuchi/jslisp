module.exports = (function() {

    var PEG = require("./parser");

    var opMap = {
        "+": function(arr) { return evalAST(arr[1]) + evalAST(arr[2]); },
        "-": function(arr) { return evalAST(arr[1]) - evalAST(arr[2]); },
        "*": function(arr) { return evalAST(arr[1]) * evalAST(arr[2]); },
        "/": function(arr) { return evalAST(arr[1]) / evalAST(arr[2]); },
        "%": function(arr) { return evalAST(arr[1]) % evalAST(arr[2]); },
        "<": function(arr) { return evalAST(arr[1]) < evalAST(arr[2]); },
        "<=": function(arr) { return evalAST(arr[1]) <= evalAST(arr[2]); },
        "defun": function(arr) {
            var name = arr[1];
            var args = arr[2];
            var ast  = arr[3];
            funcMap[name] = function(params) {
                var m = {};
                for(var i = 0; i < args.length; i++) {
                    m[args[i]] = params[i];
                }
                callStack.push(m);
                var ret = evalAST(ast);
                callStack.pop();
                return ret;
            };
            return name;
        },
        "if": function(arr) {
            return (evalAST(arr[1]))? evalAST(arr[2]) : evalAST(arr[3]);
        }
    };

    var callStack = [];

    var funcMap = {};

    function getStackTop() {
        return callStack[callStack.length -1];
    }

    var funcCache = null;
    var funcCacheName = null;

    function evalAST(ast) {
        if(ast instanceof Array) {
            if(ast.length == 0) {
                return null;
            }
            var symbol = ast[0];//evalAST(ast[0]);
            var op = opMap[symbol];
            if(op) {
                return op(ast);
            } else {
                var args = [];
                for(var i = 1; i < ast.length; i++) {
                    args.push(evalAST(ast[i]));
                }
                if(symbol == funcCacheName) {
                    return funcCache(args);
                }
                funcCacheName = symbol;
                funcCache = funcMap[symbol];
                return funcCache(args);
            }
        } else if (typeof ast == 'string') {
            var p = getStackTop();
            if(!p) {
                return ast;
            }
            else if(!p[ast]) {
                return ast;
            }
            return p[ast];
        }
        return ast;
    }

    function main(argv, line) { //FIXME command line option
        var ast = PEG.parse(line);
        console.log("%j", ast);
        for(var i = 0; i < ast.length; i++) {
            console.log(evalAST(ast[i]));
        }
    }

    return {
        main: main
    };
})();
