#!/usr/bin/env node

opt = require('node-getopt').create([
		['d' , 'dump', 'dump ast'],
		['h' , 'help', 'display this help'],
		])
		.bindHelp()
		.parseSystem();

var lisp = require('./src/lisp');

switch (process.argv.length) {
	case 2:
		var readline = require("readline");
		var repl = readline.createInterface(process.stdin, process.stdout);
		repl.setPrompt(">>> ");

		repl.prompt();

		repl.on("line", function(line) {
				lisp.main(opt, line);
				repl.prompt();
		});

		repl.on("close", function() {
				console.log("bye!");
		});
		break;
	case 3:
		var fs = require('fs');
		fs.readFile(process.argv[2], 'utf8', function(err, str) {
				if (err) {
					console.log(err);
				} else {
					console.log(str);
					lisp.main(opt, str);
				}
		});
		break;
	default:
		console.log("invalid argument");
		break;
}
