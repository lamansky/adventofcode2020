'use strict'

function day03 (input, slopes) {
  const lines = input.split('\n')
  return slopes.reduce((result, [right, down]) => result * lines.filter((x, i) => i % down === 0).reduce((trees, line, j) => trees + (line[(j * right) % line.length] === '#' ? 1 : 0), 0), 1)
}

module.exports.part1 = input => day03(input, [[3, 1]])
module.exports.part2 = input => day03(input, [[3, 1], [5, 1], [7, 1], [1, 2]])
