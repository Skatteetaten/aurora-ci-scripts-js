#!/usr/bin/env node

import { spawn } from 'child_process';

const args = process.argv;
const script = args[2];
const scriptArgs = args.slice(3);

const appPath = process.cwd();

function runScript(script: string, extraArgs: string[]): void {
  const cmd = spawn(
    'node',
    [require.resolve('../scripts/' + script)].concat(extraArgs)
  );

  cmd.stdout.on('data', (data: Buffer) => {
    process.stdout.write(data);
  });

  cmd.stderr.on('data', (data: Buffer) => {
    process.stderr.write(data);
  });
}

switch (script) {
  case 'upload':
  case 'pack-dependencies': {
    runScript(script, [appPath, ...scriptArgs]);
    break;
  }
  default: {
    console.log('Not a valid command:', script);
  }
}
