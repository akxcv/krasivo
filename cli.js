#!/usr/bin/env node
var krasivo = require('./krasivo')

// string, fg, bg
var args = process.argv.slice(-3)
console.log(krasivo(args[0], args[1], args[2]))
