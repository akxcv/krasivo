#!/usr/bin/env node

var fs = require('fs')
var os = require('os')
var path = require('path')
var jsYaml = require('js-yaml')
var chalk = require('chalk')
var krasivo = require('./krasivo')

var CONFIG_PATH = path.join(os.homedir(), '.krasivorc')
try {
  var rawConfig = fs.readFileSync(CONFIG_PATH, 'utf-8')
} catch (_) {
  // no config found; do nothing
}

var defaultOptions = {}
if (typeof rawConfig !== 'undefined') {
  try {
    var config = jsYaml.safeLoad(rawConfig) || {}
  } catch (_) {
    console.log(chalk.bgRed.bold.white(' ERROR '), chalk.red('.krasivorc is not a valid YAML file'))
    process.exit(1)
  }
  var defaultOptions = config.options || {}
}

if (defaultOptions.shortEmoji === undefined) defaultOptions.shortEmoji = true

require('yargs')
  .command('*', 'Communicate prettily', function (yargs) {
    yargs
      .usage('$0 <string> <foreground> <background>')
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
    if (argv._.length !== 3) {
      throw new Error('Incorrect number of arguments provided! See `krasivo --help` for help.')
    }
    console.log(
      krasivo.apply(null, Array.prototype.concat.call(argv._, {
        shortEmoji: argv.shortEmoji,
        skinTone: argv.skinTone
      }))
    )
  })
  .option('short-emoji', {
    alias: 'e',
    default: defaultOptions.shortEmoji,
    describe: 'convert emoji names to emoji symbols'
  })
  .option('skin-tone', {
    alias: 's',
    default: defaultOptions.skinTone,
    describe: 'default skin tone for emoji with skin variations'
  })
  .argv
