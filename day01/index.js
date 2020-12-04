'use strict'

const neach = require('neach')

function day01 (input, howMany) {
  for (const set of neach(...Array(howMany).fill(input.split('\n').map(n => Number(n)), 0, howMany))) {
    if (set.reduce((t, n) => t + n, 0) === 2020) return set.reduce((t, n) => t * n, 1)
  }
}

module.exports.part1 = input => day01(input, 2)
module.exports.part2 = input => day01(input, 3)
