'use strict'

const fs = require('fs')
const path = require('path')
const toNumber = require('2/number')

const chalk = require('chalk')
const program = require('commander')

function error (message) {
  process.stdout.write(chalk.red(message) + '\n')
}

function solve (day, part) {
  const dayNN = day.padStart(2, '0')
  day = toNumber(day)
  part = toNumber(part)
  if (day < 1 || day > 25) return error('The day parameter must be between 1 and 25.')

  const requirePath = path.resolve(__dirname, 'day' + dayNN, 'index.js')
  if (!fs.existsSync(requirePath)) return error('There isn’t yet a solution for day ' + day + '.')

  const inputPath = path.resolve(__dirname, 'day' + dayNN, 'input.txt')
  if (!fs.existsSync(requirePath)) return error('No input found for day ' + day + '.')

  const input = fs.readFileSync(inputPath, {encoding: 'utf8'})
  const dayParts = require(requirePath)

  const outputSolution = partToOutput => {
    const dayPart = dayParts['part' + partToOutput]
    if (typeof dayPart !== 'function') return error('There isn’t yet a solution for day ' + day + ' part ' + partToOutput + '.')
    process.stdout.write(chalk.green('The solution for day ' + day + ' part ' + partToOutput + ' is ') + dayPart(input) + '\n')
  }

  const singlePart = (part === 1 || part === 2)
  if (!singlePart || part === 1) outputSolution(1)
  if (!singlePart || part === 2) outputSolution(2)
}

program
  .description('Advent of Code 2020 Solutions')
  .helpOption('-h, --help', 'Output the current help screen, or display help for any other specified command.')

program
  .command('solve <day> [part]')
  .description('Output the solution for the given part of the given day’s puzzle.')
  .action(solve)

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.help()
}
