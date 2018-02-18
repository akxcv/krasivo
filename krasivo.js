var symbols = require('./build/symbols.json')
var emoji = require('./build/emoji.json')
var SYMBOL_HEIGHT = 7
var BACKGROUND_SYMBOL = '.'
var FOREGROUND_SYMBOL = '#'
var BACKGROUND_REGEXP = new RegExp('\\' + BACKGROUND_SYMBOL, 'g')
var FOREGROUND_REGEXP = new RegExp('\\' + FOREGROUND_SYMBOL, 'g')
var EMOJI_WITH_SKIN_COLOUR_REGEXP = /:([\w-]+):(?::(skin-tone-\d):)?/g
var EMOJI_NAME_REGEXP = /:([\w-]+):/g // word character, '_', or '-'
var isArray =
  Array.isArray || function (arg) { Object.prototype.toString.call(arg) === '[object Array]' }
var arrayIncludes = Array.prototype.includes
  ? function (arr, arg) { return arr.includes(arg) }
  : function (arr, arg) { arr.indexOf(arg) > -1 }

var defaultOptions = {
  shortEmoji: true
}

module.exports = function krasivo (string, foreground, background, options) {
  var str = string.toString().toLowerCase()
  var rows = []
  var rowFragments = []
  var symbol // for use in inner cycle
  options = Object.assign({}, defaultOptions, options || {})

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
    foreground.toString(),
    background.toString(),
    options
  )
}

/**
 * Replaces foreground and background placeholders with given foreground and background strings.
 * Example:
 *   replaceForegroundAndBackground(
 *     `
 *        #....
 *        #....
 *        #....
 *        #....
 *        #....
 *        #....
 *        #####
 *     `,
 *     'X',
 *     ' '
 *   )
 *   => `
 *        X
 *        X
 *        X
 *        X
 *        X
 *        X
 *        XXXXX
 *      `
 */
function replaceForegroundAndBackground(string, foreground, background, options) {
  var matches, match // temporary storage for regexp matches

  if (options.skinTone) {
    while (match = EMOJI_WITH_SKIN_COLOUR_REGEXP.exec(foreground)) {
      // if skin tone is not specified AND the emoji supports skin tones
      if (match[2] === undefined && arrayIncludes(emoji.emojiWithSkinVariations, match[1])) {
        foreground = foreground.replace(match[0], match[0] + ':skin-tone-' + options.skinTone + ':')
      }
    }

    while (match = EMOJI_WITH_SKIN_COLOUR_REGEXP.exec(background)) {
      // if skin tone is not specified AND the emoji supports skin tones
      if (match[2] === undefined && arrayIncludes(emoji.emojiWithSkinVariations, match[1])) {
        background = background.replace(match[0], match[0] + ':skin-tone-' + options.skinTone + ':')
      }
    }
  }

  if (options.shortEmoji) {
    matches = foreground.match(EMOJI_NAME_REGEXP)
    if (matches) {
      for (var i = 0, l = matches.length; i < l; i += 1) {
        match = matches[i]
        foreground = foreground.replace(match, getEmojiByName(match))
      }
    }

    matches = background.match(EMOJI_NAME_REGEXP)
    if (matches) {
      for (var i = 0, l = matches.length; i < l; i += 1) {
        match = matches[i]
        background = background.replace(match, getEmojiByName(match))
      }
    }
  }

  return string
    .replace(FOREGROUND_REGEXP, foreground)
    .replace(BACKGROUND_REGEXP, background)
}

/**
 * Returns the emoji symbol from a given emoji name. If no emoji is found by given name,
 * returns the given string as is.
 * Examples:
 *   getEmojiByName(':100:')      => '\u{1f4af}'
 *   getEmojiByName(':hash:')     => '\u{0023}\u{feof}\u{20e3}'
 *   getEmojiByName(':krasivo:')  => ':krasivo:'
 */
function getEmojiByName(name) {
  // slice because we have to strip leading and trailing ':'
  var emojiCode = emoji.emojiCodePoints[name.slice(1, -1)]
  if (emojiCode === undefined) {
    // no emoji found by short name, return initial string
    return name
  }

  return isArray(emojiCode)
    ? emojiCode.map(symbolFromCodePoint).join('')
    : symbolFromCodePoint(emojiCode)
}

/**
 * Returns the Unicode symbol for a given code point.
 * Example:
 *   symbolFromCodePoint(254) => '\u{feof}'
 */
function symbolFromCodePoint(codePoint) {
  // AFAIK, using `eval` is the only way to generate any emoji from code points
  return eval('"\\u{' + codePoint + '}"')
}
