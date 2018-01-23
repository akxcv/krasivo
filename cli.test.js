const child_process = require('child_process')

function callCLI (...args) {
  // buffer to string
  return child_process.execFileSync('./cli.js', args).toString()
}

describe('cli', () => {
  it('works', () => {
    expect(callCLI('lol', 'x', '~')).toBe(
      [
        'x~~~~~~xxx~~x~~~~',
        'x~~~~~x~~~x~x~~~~',
        'x~~~~~x~~~x~x~~~~',
        'x~~~~~x~~~x~x~~~~',
        'x~~~~~x~~~x~x~~~~',
        'x~~~~~x~~~x~x~~~~',
        'xxxxx~~xxx~~xxxxx',
        ''
      ].join('\n')
    )
  })

  it('passes options correctly', () => {
    expect(callCLI('lol', ':no_good:', ':wave:', '--short-emoji')).toBe(
      [
        '🙅👋👋👋👋👋👋🙅🙅🙅👋👋🙅👋👋👋👋',
        '🙅👋👋👋👋👋🙅👋👋👋🙅👋🙅👋👋👋👋',
        '🙅👋👋👋👋👋🙅👋👋👋🙅👋🙅👋👋👋👋',
        '🙅👋👋👋👋👋🙅👋👋👋🙅👋🙅👋👋👋👋',
        '🙅👋👋👋👋👋🙅👋👋👋🙅👋🙅👋👋👋👋',
        '🙅👋👋👋👋👋🙅👋👋👋🙅👋🙅👋👋👋👋',
        '🙅🙅🙅🙅🙅👋👋🙅🙅🙅👋👋🙅🙅🙅🙅🙅',
        ''
      ].join('\n')
    )

    expect(callCLI('lol', ':no_good:', ':wave:', '--no-short-emoji')).toBe(
      [
        ':no_good::wave::wave::wave::wave::wave::wave::no_good::no_good::no_good::wave::wave::no_good::wave::wave::wave::wave:',
        ':no_good::wave::wave::wave::wave::wave::no_good::wave::wave::wave::no_good::wave::no_good::wave::wave::wave::wave:',
        ':no_good::wave::wave::wave::wave::wave::no_good::wave::wave::wave::no_good::wave::no_good::wave::wave::wave::wave:',
        ':no_good::wave::wave::wave::wave::wave::no_good::wave::wave::wave::no_good::wave::no_good::wave::wave::wave::wave:',
        ':no_good::wave::wave::wave::wave::wave::no_good::wave::wave::wave::no_good::wave::no_good::wave::wave::wave::wave:',
        ':no_good::wave::wave::wave::wave::wave::no_good::wave::wave::wave::no_good::wave::no_good::wave::wave::wave::wave:',
        ':no_good::no_good::no_good::no_good::no_good::wave::wave::no_good::no_good::no_good::wave::wave::no_good::no_good::no_good::no_good::no_good:',
        ''
      ].join('\n')
    )
  })
})
