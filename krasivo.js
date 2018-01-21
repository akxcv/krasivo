var symbols = require('./build/symbols.json')
var emoji = require('./build/emoji.json')
var SYMBOL_HEIGHT = 7
var BACKGROUND_SYMBOL = '.'
var FOREGROUND_SYMBOL = '#'
var BACKGROUND_REGEXP = new RegExp('\\' + BACKGROUND_SYMBOL, 'g')
var FOREGROUND_REGEXP = new RegExp('\\' + FOREGROUND_SYMBOL, 'g')
var EMOJI_NAME_REGEXP = /:([\w-]+):/ // word character, '_', or '-'
var isArray =
  Array.isArray || function (arg) { Object.prototype.toString.call(arg) === '[object Array]' }

module.exports = function krasivo (string, foreground, background) {
  var str = string.toLowerCase()
  var rows = []
  var rowFragments = []
  var symbol // for use in inner cycle

  for (var i = 0; i < SYMBOL_HEIGHT; i += 1) {
    rowFragments.length = 0
    for (var j = 0, l = str.length; j < l; j += 1) {
      symbol = str[j]
      try {
        rowFragments.push(symbols[symbol][i])
      } catch (e) {
        throw new Error('Unsupported symbol: ' + symbol)
      }
    }
    rows.push(rowFragments.join(BACKGROUND_SYMBOL))
  }

  return replaceForegroundAndBackground(
    rows.join('\n'),
    foreground,
    background
  )
}

function replaceForegroundAndBackground (string, foreground, background) {
  var match // temporary storage for regexp matches
  while (match = foreground.match(EMOJI_NAME_REGEXP)) {
    // match[1] for group 1
    foreground = foreground.replace(EMOJI_NAME_REGEXP, getEmojiByShortName(match[1]))
  }
  while (match = background.match(EMOJI_NAME_REGEXP)) {
    background = background.replace(EMOJI_NAME_REGEXP, getEmojiByShortName(match[1]))
  }
  return string
    .replace(FOREGROUND_REGEXP, foreground)
    .replace(BACKGROUND_REGEXP, background)
}

function getEmojiByShortName (shortName) {
  var emojiCode = emoji[shortName]
  if (emojiCode === undefined) {
    throw new Error('Invalid emoji name: ' + shortName)
  }

  return isArray(emojiCode)
    ? emojiCode.map(symbolFromCodePoint).join('')
    : symbolFromCodePoint(emojiCode)
}

function symbolFromCodePoint (codePoint) {
  // AFAIK, using `eval` is the only way to generate any emoji from code points
  return eval('"\\u{' + codePoint + '}"')
}
