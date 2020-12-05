'use strict'

const getIds = input => input.split('\n').filter(Boolean).map(line => parseInt(line.replace(/[FL]/g, '0').replace(/[BR]/g, '1'), 2))

module.exports.part1 = input => getIds(input).reduce((h, v) => v > h ? v : h, 0)
module.exports.part2 = input => getIds(input).sort((a, b) => a - b).find((e, i, a) => e - a[0] > i) - 1
