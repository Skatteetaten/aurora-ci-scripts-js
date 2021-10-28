import { statSync } from 'fs';
import { resolve } from 'path';

import { Packer, PackDependenciesResult } from '../services/Packer';
import { getSize } from '../utils/utils';
import { ErrorHandler } from '../services/ErrorHandler';

function printStats(quiet: boolean, result: PackDependenciesResult): void {
  if (quiet) {
    return;
  }

  if (!result.hasBundledDependencies) {
    console.log('===== Info =====');
    console.log('No dependencies to analyze');
    console.log('Packing Dependencies skipped');
    return;
  }

  if (!result.hasCreatedTarball) {
    throw new Error('Tarball not created when it should have been.');
  }

  const { target, bundledDependencies, allDependencies } = result;
  const uniqueDepSize = allDependencies.length - bundledDependencies.length;
  const stat = statSync(target);

  console.log('===== Details =====');
  console.log('Name:            ', target);
  console.log('Dependencies:    ', bundledDependencies.length);
  console.log('Sub dependencies:', uniqueDepSize);
  console.log('Size:            ', getSize(stat.size));
}

try {
  const appPath = process.argv[2];
  const packageJsonPath = resolve(appPath, 'package.json');
  Packer.packDependencies({
    packageJsonPath,
    onClose: printStats,
  });
} catch (error: unknown) {
  if (error instanceof Error) {
    ErrorHandler.logAndExit(error);
  } else {
    console.warn(error);
  }
}
