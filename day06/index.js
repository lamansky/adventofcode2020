'use strict'

const intersect = require('array-intersection')

module.exports.part1 = input => input.split('\n\n').reduce((total, group) => total + (new Set(group.replace(/[^a-z]/g, ''))).size, 0)
module.exports.part2 = input => input.split('\n\n').reduce((total, group) => total + intersect(...group.split('\n').filter(Boolean).map(person => Array.from(person))).length, 0)
