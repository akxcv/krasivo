#!/usr/bin/env node
const fs = require('fs')
const process = require('process')

const krasivorcContents = process.env.KRASIVORC_CONTENTS
const origReadFileSync = fs.readFileSync
fs.readFileSync = function readFileSync (filePath, ...args) {
  if (filePath.match(/\.krasivorc$/)) {
    if (krasivorcContents !== undefined) {
      return krasivorcContents
    } else {
      throw new Error()
    }
  }
  return origReadFileSync(filePath, ...args)
}

require('./cli.js')
