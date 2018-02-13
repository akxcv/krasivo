const child_process = require('child_process')
const fixtures = require('./__fixtures__')

let krasivorcContents = undefined
function callCLI (...args) {
  const result = child_process.spawnSync(
    './cli.mock.js',
    args,
    {
      env: {
        ...process.env,
        KRASIVORC_CONTENTS: krasivorcContents
      }
    })
  if (result.status === 0) {
    return result.stdout.toString() // stdout buffer to string
  }
  return {
    status: result.status,
    stdout: result.stdout.toString()
  }
}

describe('cli', () => {
  beforeEach(() => {
    krasivorcContents = undefined
  })

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

    expect(callCLI('lol', ':no_good:', ':wave:', '--skin-tone=2')).toBe(
      [
        '🙅🏻👋🏻👋🏻👋🏻👋🏻👋🏻👋🏻🙅🏻🙅🏻🙅🏻👋🏻👋🏻🙅🏻👋🏻👋🏻👋🏻👋🏻',
        '🙅🏻👋🏻👋🏻👋🏻👋🏻👋🏻🙅🏻👋🏻👋🏻👋🏻🙅🏻👋🏻🙅🏻👋🏻👋🏻👋🏻👋🏻',
        '🙅🏻👋🏻👋🏻👋🏻👋🏻👋🏻🙅🏻👋🏻👋🏻👋🏻🙅🏻👋🏻🙅🏻👋🏻👋🏻👋🏻👋🏻',
        '🙅🏻👋🏻👋🏻👋🏻👋🏻👋🏻🙅🏻👋🏻👋🏻👋🏻🙅🏻👋🏻🙅🏻👋🏻👋🏻👋🏻👋🏻',
        '🙅🏻👋🏻👋🏻👋🏻👋🏻👋🏻🙅🏻👋🏻👋🏻👋🏻🙅🏻👋🏻🙅🏻👋🏻👋🏻👋🏻👋🏻',
        '🙅🏻👋🏻👋🏻👋🏻👋🏻👋🏻🙅🏻👋🏻👋🏻👋🏻🙅🏻👋🏻🙅🏻👋🏻👋🏻👋🏻👋🏻',
        '🙅🏻🙅🏻🙅🏻🙅🏻🙅🏻👋🏻👋🏻🙅🏻🙅🏻🙅🏻👋🏻👋🏻🙅🏻🙅🏻🙅🏻🙅🏻🙅🏻',
        ''
      ].join('\n')
    )
  })

  it('takes settings from ~/.krasivorc', () => {
    krasivorcContents = fixtures.withskinTone
    expect(callCLI('lol', ':no_good:', ':wave:')).toBe(
      [
        '🙅🏻👋🏻👋🏻👋🏻👋🏻👋🏻👋🏻🙅🏻🙅🏻🙅🏻👋🏻👋🏻🙅🏻👋🏻👋🏻👋🏻👋🏻',
        '🙅🏻👋🏻👋🏻👋🏻👋🏻👋🏻🙅🏻👋🏻👋🏻👋🏻🙅🏻👋🏻🙅🏻👋🏻👋🏻👋🏻👋🏻',
        '🙅🏻👋🏻👋🏻👋🏻👋🏻👋🏻🙅🏻👋🏻👋🏻👋🏻🙅🏻👋🏻🙅🏻👋🏻👋🏻👋🏻👋🏻',
        '🙅🏻👋🏻👋🏻👋🏻👋🏻👋🏻🙅🏻👋🏻👋🏻👋🏻🙅🏻👋🏻🙅🏻👋🏻👋🏻👋🏻👋🏻',
        '🙅🏻👋🏻👋🏻👋🏻👋🏻👋🏻🙅🏻👋🏻👋🏻👋🏻🙅🏻👋🏻🙅🏻👋🏻👋🏻👋🏻👋🏻',
        '🙅🏻👋🏻👋🏻👋🏻👋🏻👋🏻🙅🏻👋🏻👋🏻👋🏻🙅🏻👋🏻🙅🏻👋🏻👋🏻👋🏻👋🏻',
        '🙅🏻🙅🏻🙅🏻🙅🏻🙅🏻👋🏻👋🏻🙅🏻🙅🏻🙅🏻👋🏻👋🏻🙅🏻🙅🏻🙅🏻🙅🏻🙅🏻',
        ''
      ].join('\n')
    )

    krasivorcContents = fixtures.withAllOptions
    expect(callCLI('lol', ':no_good:', ':wave:')).toBe(
      [
        ':no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::no_good::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2:',
        ':no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2:',
        ':no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2:',
        ':no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2:',
        ':no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2:',
        ':no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2:',
        ':no_good::skin-tone-2::no_good::skin-tone-2::no_good::skin-tone-2::no_good::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::no_good::skin-tone-2::no_good::skin-tone-2::wave::skin-tone-2::wave::skin-tone-2::no_good::skin-tone-2::no_good::skin-tone-2::no_good::skin-tone-2::no_good::skin-tone-2::no_good::skin-tone-2:',
        ''
      ].join('\n')
    )
  })

  it('reports an error when ~/.krasivorc contains invalid YAML', () => {
    krasivorcContents = fixtures.invalid
    const result = callCLI('lol', ':no_good:', ':wave:')
    expect(result.status).not.toBe(0)
    expect(result.stdout).toBe(' ERROR  .krasivorc is not a valid YAML file\n')
  })
})
