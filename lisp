#!/usr/bin/env node

opt = require('node-getopt').create([
		['d' , 'dump', 'dump ast'],
		['h' , 'help', 'display this help'],
		])
		.bindHelp()
		.parseSystem();

var lisp = require('./src/lisp');
lisp.main(opt, "(defun fibo (n) (if (< n 3) 1 (+ (fibo (- n 1)) (fibo (- n 2)))))(fibo 36)");
//lisp.main(opt,"(defun tak(x y z) (if (<= x y) y (tak (tak (- x 1) y z) (tak (- y 1) z x) (tak (- z 1) x y))))(tak 2 1 0)");
