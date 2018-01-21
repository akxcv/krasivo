var symbols = require('./build/symbols.json')
var emoji = require('./build/emoji.json')
var SYMBOL_HEIGHT = 7
var BACKGROUND_SYMBOL = '.'
var FOREGROUND_SYMBOL = '#'
var BACKGROUND_REGEXP = new RegExp('\\' + BACKGROUND_SYMBOL, 'g')
var FOREGROUND_REGEXP = new RegExp('\\' + FOREGROUND_SYMBOL, 'g')
var EMOJI_NAME_REGEXP = /:([\w-]+):/g // word character, '_', or '-'
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
  var matches, match // temporary storage for regexp matches

  matches = foreground.match(EMOJI_NAME_REGEXP)
  if (matches) {
    for (var i = 0, l = matches.length; i < l; i += 1) {
      match = matches[i]
      foreground = foreground.replace(match, getEmojiByShortName(match))
    }
  }

  matches = background.match(EMOJI_NAME_REGEXP)
  if (matches) {
    for (var i = 0, l = matches.length; i < l; i += 1) {
      match = matches[i]
      background = background.replace(match, getEmojiByShortName(match))
    }
  }

  return string
    .replace(FOREGROUND_REGEXP, foreground)
    .replace(BACKGROUND_REGEXP, background)
}

function getEmojiByShortName (shortName) {
  // slice because we have to strip leading and trailing ':'
  var emojiCode = emoji[shortName.slice(1, -1)]
  if (emojiCode === undefined) {
    // no emoji found by short name, return initial string
    return shortName
  }

  return isArray(emojiCode)
    ? emojiCode.map(symbolFromCodePoint).join('')
    : symbolFromCodePoint(emojiCode)
}

function symbolFromCodePoint (codePoint) {
  // AFAIK, using `eval` is the only way to generate any emoji from code points
  return eval('"\\u{' + codePoint + '}"')
}
