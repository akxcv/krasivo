var symbols = require('./build/symbols.json')
var SYMBOL_HEIGHT = 7
var BACKGROUND_SYMBOL = '.'
var FOREGROUND_SYMBOL = '#'
var BACKGROUND_REGEXP = new RegExp('\\' + BACKGROUND_SYMBOL, 'g')
var FOREGROUND_REGEXP = new RegExp('\\' + FOREGROUND_SYMBOL, 'g')

module.exports = function krasivo (string, foreground, background) {
  var str = string.toLowerCase()
  var rows = []
  var rowFragments = []
  var symbol // for use in inner cycle

  for (var i = 0; i < SYMBOL_HEIGHT; i += 1) {
    rowFragments.length = 0
    for (var j = 0, l = string.length; j < l; j += 1) {
      symbol = string[j]
      if (symbol === ' ') {
        rowFragments.push(BACKGROUND_SYMBOL + BACKGROUND_SYMBOL + BACKGROUND_SYMBOL)
      } else {
        try {
          rowFragments.push(symbols[symbol][i])
        } catch (e) {
          throw new Error('Unsupported symbol: ' + symbol)
        }
      }
    }
    rows.push(rowFragments.join(BACKGROUND_SYMBOL))
  }

  return rows
    .join('\n')
    .replace(FOREGROUND_REGEXP, foreground)
    .replace(BACKGROUND_REGEXP, background)
}
