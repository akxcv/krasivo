# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.2.2] - 2018-02-18
### Fixed
- Include "+" (plus) sign to emoji regexp, which allows to use the "+1" emoji name.

## [1.2.1] - 2018-02-17
### Fixed
- Bug with applying default skin tones to foregrounds / backgrounds consisting of
more than 1 emoji

## [1.2.0] - 2018-02-13
### Added
- Feature: default skin tones
- Feature: local CLI config via ~/.krasivorc
- Support for "-" (minus) sign - ([@nesaulov][])
### Fixed
- Non-string arguments passed as foreground or background behaved incorrectly - ([@nesaulov][])

## [1.1.0] - 2018-01-23
### Added
- Feature: convert emoji names to Unicode emoji symbols

## [1.0.1] - 2018-01-20
### Added
- Support for uppercase symbols
- Support for numbers - ([@past-one][])

## [1.0.0] - 2018-01-19
Initial release.

[@past-one]: https://github.com/past-one
[@nesaulov]: https://github.com/nesaulov
