#!/usr/bin/env node
// 指定解释器
const program = require('commander')

// kkb -V
program.version(require('../package.json').version)

// kkb init <name>
program.command('init <name>')
  .description('init project')
  .action(require('../libs/init'))

program.command('refresh')
  .description('refresh routes')
  .action(require('../libs/refresh'))

program.parse(process.argv)