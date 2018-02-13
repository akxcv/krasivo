const fs = require('fs')
const path = require('path')

function loadFixture (name) {
  return fs.readFileSync(path.join(__dirname, `krasivorc.${name}.yml`))
}

module.exports = {
  withDefaultSkinTone: loadFixture('withDefaultSkinTone'),
  withAllOptions: loadFixture('withAllOptions'),
  invalid: loadFixture('invalid')
}
