const fs = require('fs')
const path = require('path')

function loadFixture (name) {
  return fs.readFileSync(path.join(__dirname, `krasivorc.${name}.yml`))
}

module.exports = {
  withSkinTone: loadFixture('withSkinTone'),
  withAllOptions: loadFixture('withAllOptions'),
  invalid: loadFixture('invalid')
}
