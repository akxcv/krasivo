const rawKrasivo = require('./krasivo')

const defaultOptions = { shortEmoji: false }
function krasivo (...args) {
  return rawKrasivo(args[0], args[1], args[2], { ...defaultOptions, ...args[3] })
}

describe('krasivo', () => {
  it('works with English symbols', () => {
    expect(
      krasivo('lol', 'x', '~')
    ).toBe(
      [
        'x~~~~~~xxx~~x~~~~',
        'x~~~~~x~~~x~x~~~~',
        'x~~~~~x~~~x~x~~~~',
        'x~~~~~x~~~x~x~~~~',
        'x~~~~~x~~~x~x~~~~',
        'x~~~~~x~~~x~x~~~~',
        'xxxxx~~xxx~~xxxxx'
      ].join('\n')
    )
  })

  it('works with Russian symbols', () => {
    expect(
      krasivo('лол', 'x', '~')
    ).toBe(
      [
        '~~xxx~~xxx~~~~xxx',
        '~x~~x~x~~~x~~x~~x',
        '~x~~x~x~~~x~~x~~x',
        '~x~~x~x~~~x~~x~~x',
        'x~~~x~x~~~x~x~~~x',
        'x~~~x~x~~~x~x~~~x',
        'x~~~x~~xxx~~x~~~x'
      ].join('\n')
    )
  })

  it('works with numbers and punctuation', () => {
    expect(
      krasivo('please, no :(((', 'x', '~')
    ).toBe(
      [
        'xxxx~~x~~~~~xxxxx~~xxx~~~xxxx~xxxxx~~~~~~~~~x~~~x~~xxx~~~~~~~~~~~~x~~~x~~~x',
        'x~~~x~x~~~~~x~~~~~x~~~x~x~~~~~x~~~~~~~~~~~~~x~~~x~x~~~x~~~~~~~~~~x~~~x~~~x~',
        'x~~~x~x~~~~~x~~~~~x~~~x~x~~~~~x~~~~~~~~~~~~~xx~~x~x~~~x~~~~~~x~~x~~~x~~~x~~',
        'xxxx~~x~~~~~xxxx~~xxxxx~~xxx~~xxxx~~~~~~~~~~x~x~x~x~~~x~~~~~~~~~x~~~x~~~x~~',
        'x~~~~~x~~~~~x~~~~~x~~~x~~~~~x~x~~~~~~~~~~~~~x~~xx~x~~~x~~~~~~x~~x~~~x~~~x~~',
        'x~~~~~x~~~~~x~~~~~x~~~x~~~~~x~x~~~~~~x~~~~~~x~~~x~x~~~x~~~~~~~~~~x~~~x~~~x~',
        'x~~~~~xxxxx~xxxxx~x~~~x~xxxx~~xxxxx~x~~~~~~~x~~~x~~xxx~~~~~~~~~~~~x~~~x~~~x'
      ].join('\n')
    )
  })

  it('throws an error when given unsupported symbols', () => {
    expect(() => {
      krasivo('π', 'x', '~')
    }).toThrowError('Unsupported symbol: π')
  })

  it('converts input to string', () => {
    expect(
      krasivo(1, 'x', '~')
    ).toBe(
      [
        '~~x',
        '~xx',
        'x~x',
        '~~x',
        '~~x',
        '~~x',
        '~~x',
      ].join('\n')
    )
  })

  it('works with upper case', () => {
    expect(
      krasivo('lol', 'x', 'o')
    ).toBe(
      krasivo('LOL', 'x', 'o')
    )
  })

  describe('shortEmoji', () => {
    it('converts emoji names to emoji symbols when shortEmoji is true', () => {
      expect(
        krasivo('lol', ':no_good:', ' ', { shortEmoji: true })
      ).toBe(
        [
          '🙅      🙅🙅🙅  🙅    ',
          '🙅     🙅   🙅 🙅    ',
          '🙅     🙅   🙅 🙅    ',
          '🙅     🙅   🙅 🙅    ',
          '🙅     🙅   🙅 🙅    ',
          '🙅     🙅   🙅 🙅    ',
          '🙅🙅🙅🙅🙅  🙅🙅🙅  🙅🙅🙅🙅🙅'
        ].join('\n')
      )
    })

    it('supports Slack skin tones', () => {
      expect(
        krasivo('lol', ':+1::skin-tone-2:', ' ', { shortEmoji: true })
      ).toBe(
        [
          '👍🏻      👍🏻👍🏻👍🏻  👍🏻    ',
          '👍🏻     👍🏻   👍🏻 👍🏻    ',
          '👍🏻     👍🏻   👍🏻 👍🏻    ',
          '👍🏻     👍🏻   👍🏻 👍🏻    ',
          '👍🏻     👍🏻   👍🏻 👍🏻    ',
          '👍🏻     👍🏻   👍🏻 👍🏻    ',
          '👍🏻👍🏻👍🏻👍🏻👍🏻  👍🏻👍🏻👍🏻  👍🏻👍🏻👍🏻👍🏻👍🏻'
        ].join('\n')
      )
    })

    it('does not convert to emoji when no emoji found by name', () => {
      expect(
        krasivo('1', ':no_goody:', ' ', { shortEmoji: true })
      ).toBe(
        [
          '  :no_goody:',
          ' :no_goody::no_goody:',
          ':no_goody: :no_goody:',
          '  :no_goody:',
          '  :no_goody:',
          '  :no_goody:',
          '  :no_goody:'
        ].join('\n')
      )
    })

    it('does not convert to emoji when shortEmoji is false', () => {
      expect(
        krasivo('1', ':no_good:', ' ', { shortEmoji: false })
      ).toBe(
        [
          '  :no_good:',
          ' :no_good::no_good:',
          ':no_good: :no_good:',
          '  :no_good:',
          '  :no_good:',
          '  :no_good:',
          '  :no_good:'
        ].join('\n')
      )
    })
  })

  describe('skinTone', () => {
    it('sets default skin tone to appropriate emojis', () => {
      expect(
        krasivo('1', ':no_good:', ':wave:', { skinTone: 2 })
      ).toBe(
        [
          ':wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2:',
          ':wave::skin-tone-2::no_good::skin-tone-2::no_good::skin-tone-2:',
          ':no_good::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2:',
          ':wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2:',
          ':wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2:',
          ':wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2:',
          ':wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2:'
        ].join('\n')
      )
    })

    it('does not set skin tone if it has already been specified', () => {
      expect(
        krasivo('1', ':no_good::skin-tone-6:', ':wave:', { skinTone: 2 })
      ).toBe(
        [
          ':wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-6:',
          ':wave::skin-tone-2::no_good::skin-tone-6::no_good::skin-tone-6:',
          ':no_good::skin-tone-6::wave::skin-tone-2::no_good::skin-tone-6:',
          ':wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-6:',
          ':wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-6:',
          ':wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-6:',
          ':wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-6:'
        ].join('\n')
      )
    })

    it('does not set skin tone if emoji does not support skin variations', () => {
      expect(
        krasivo('1', ':100:', ':wave:', { skinTone: 2 })
      ).toBe(
        [
          ':wave::skin-tone-2::wave::skin-tone-2::100:',
          ':wave::skin-tone-2::100::100:',
          ':100::wave::skin-tone-2::100:',
          ':wave::skin-tone-2::wave::skin-tone-2::100:',
          ':wave::skin-tone-2::wave::skin-tone-2::100:',
          ':wave::skin-tone-2::wave::skin-tone-2::100:',
          ':wave::skin-tone-2::wave::skin-tone-2::100:'
        ].join('\n')
      )
    })

    it('sets default skin tone to all emojis in fg/bg', () => {
      expect(
        krasivo('1', ':no_good::thumbsup:', ':wave::thumbsdown:', { skinTone: 2 })
      ).toBe(
        [
          ':wave::skin-tone-2::thumbsdown::skin-tone-2::wave::skin-tone-2::thumbsdown::skin-tone-2::no_good::skin-tone-2::thumbsup::skin-tone-2:',
          ':wave::skin-tone-2::thumbsdown::skin-tone-2::no_good::skin-tone-2::thumbsup::skin-tone-2::no_good::skin-tone-2::thumbsup::skin-tone-2:',
          ':no_good::skin-tone-2::thumbsup::skin-tone-2::wave::skin-tone-2::thumbsdown::skin-tone-2::no_good::skin-tone-2::thumbsup::skin-tone-2:',
          ':wave::skin-tone-2::thumbsdown::skin-tone-2::wave::skin-tone-2::thumbsdown::skin-tone-2::no_good::skin-tone-2::thumbsup::skin-tone-2:',
          ':wave::skin-tone-2::thumbsdown::skin-tone-2::wave::skin-tone-2::thumbsdown::skin-tone-2::no_good::skin-tone-2::thumbsup::skin-tone-2:',
          ':wave::skin-tone-2::thumbsdown::skin-tone-2::wave::skin-tone-2::thumbsdown::skin-tone-2::no_good::skin-tone-2::thumbsup::skin-tone-2:',
          ':wave::skin-tone-2::thumbsdown::skin-tone-2::wave::skin-tone-2::thumbsdown::skin-tone-2::no_good::skin-tone-2::thumbsup::skin-tone-2:'
        ].join('\n')
      )
    })
  })
})
