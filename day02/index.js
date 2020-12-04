'use strict'

const inRange = (n, min, max) => n >= min && n <= max
const toNumber = require('2/number')

function day02 (input, mode) {
  const regex = /^([0-9]+)-([0-9]+) ([a-zA-Z]+): (.+)$/
  return input.split('\n').filter(Boolean).reduce((valids, line) => {
    const [, n1, n2, char, pw] = line.match(regex).map((v, i) => [1, 2].includes(i) ? toNumber(v) : v)
    return valids + ((mode === 'count' ? inRange(Array.from(pw).filter(c => c === char).length, n1, n2) : ((pw[n1 - 1] === char) ^ (pw[n2 - 1] === char))) ? 1 : 0)
  }, 0)
}

module.exports.part1 = input => day02(input, 'count')
module.exports.part2 = input => day02(input, 'position')
