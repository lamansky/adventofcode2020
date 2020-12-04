'use strict'

const intersect = require('array-intersection')
const qfn = require('qfn')
const removeSuffix = require('remove-suffix')
const toNumber = require('2/number')

const expected = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

function inRange (n, min, max) {
  n = toNumber(n)
  return n >= min && n <= max
}

const rules = {
  byr: n => inRange(n, 1920, 2002),
  iyr: n => inRange(n, 2010, 2020),
  eyr: n => inRange(n, 2020, 2030),
  hgt: v => {
    const [n, unit] = removeSuffix(v, 'cm', 'in')
    return unit && (unit === 'cm' ? inRange(n, 150, 193) : inRange(n, 59, 76))
  },
  hcl: /^#[0-9a-f]{6}$/,
  ecl: v => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
  pid: /^[0-9]{9}$/,
}

function valid (field, value) {
  const rule = rules[field]
  if (!rule) return true
  return typeof rule === 'function' ? rule(value) : rule.test(value)
}

function day04 (input, shouldValidate) {
  const filter = qfn(fields => fields.filter(f => valid(...f)), shouldValidate)
  const keys = fields => filter(fields).map(f => f[0])
  return input.split(/\n{2,}/).reduce((result, line) => {
    const fields = line.split(/\s+/).filter(Boolean).map(f => f.match(/^([a-z]{3}):(.+)$/).slice(1, 3))
    return result + (intersect(keys(fields), expected).length >= 7 ? 1 : 0)
  }, 0)
}

module.exports.part1 = input => day04(input, false)
module.exports.part2 = input => day04(input, true)
