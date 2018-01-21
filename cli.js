#!/usr/bin/env node
var krasivo = require('./krasivo')

require('yargs')
  .command('*', 'Communicate prettily', function (yargs) {
    yargs
      .usage('$0 [args]')
      .positional('string', {
        type: 'string',
        describe: 'the string to pretty-print'
      })
      .positional('foreground', {
        type: 'string',
        describe: 'the string to fill foreground with'
      })
      .positional('background', {
        type: 'string',
        describe: 'the string to fill background with'
      })
  }, function (argv) {
    console.log(
      krasivo.apply(null, Array.prototype.concat.call(argv._, {
        shortEmoji: argv.shortEmoji
      }))
    )
  })
  .option('short-emoji', {
    alias: 'e',
    default: true,
    describe: 'convert emoji names to emoji symbols'
  })
  .argv
