# krasivo

> Russian for: prettily

![krasivo](images/krasivo.gif)

## Installation

Install with [yarn](https://yarnpkg.com):
```sh
yarn global add krasivo
```

Or, with npm:
```sh
npm i -g krasivo
```

## Usage

To use via command line:
```sh
krasivo [your text] [foreground string] [background string]
```

To use in JS code:
```js
import krasivo from 'krasivo'

console.log(krasivo('hello', 'x', ' '))
```

## API

To get help with the API, run:
```sh
krasivo --help
```

### Available options:

#### - `shortEmoji` (default: true)
When true, emoji names like `:no_good:` are converted to Unicode emoji symbols.

**CLI usage**:
```sh
krasivo hello :no_good: ' ' --short-emoji
# or:
krasivo hello :no_good: ' ' -e
# To disable:
krasivo hello :no_good: ' ' --no-short-emoji
```

**JS usage**:
```js
krasivo('hello', ':no_good', ' ', { shortEmoji: true })
// To disable:
krasivo('hello', ':no_good', ' ', { shortEmoji: false })
```

> Slack limits message length, and after the limit is broken, the only way to send the
message is to
send a "code snippet". The problem is, every symbol in an emoji name is counted as a
separate character. `shortEmoji` feature allows you to use any emoji in your message by
converting emoji names to actual Unicode emoji symbols, which are all 1 character long in
Slack.

Skin colours are supported in Slack style:

`":no_good:"` => 🙅

`":no_good::skin-tone-2:"` => 🙅🏻

`":no_good::skin-tone-3:"` => 🙅🏼

`":no_good::skin-tone-4:"` => 🙅🏽

`":no_good::skin-tone-5:"` => 🙅🏾

`":no_good::skin-tone-6:"` => 🙅🏿

## License

MIT
