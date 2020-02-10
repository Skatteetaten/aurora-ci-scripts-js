import { createWriteStream } from 'fs';
import { BundleWalkerSync } from 'npm-bundled';
import tar from 'tar';
import { getTgzName } from '../utils/utils';
import { createPackageWithBundledDeps } from '../utils/packageJson';

export interface PackDependenciesOption {
  packageJsonPath: string;
  createTarball?: boolean;
  quiet?: boolean;
  onClose: (quiet: boolean, result: PackDependenciesResult) => void;
}

export interface PackDependenciesResult {
  target: string;
  bundledDependencies: string[];
  allDependencies: string[];
  hasCreatedTarball: boolean;
  hasDependencies: boolean;
}

export class Packer {
  /**
   * Finds all dependencies for a given package.json and optional creates an tarball.
   * @param option.packageJsonPath path to package.json
   * @param option.createTarball if true it will create a tarball with all dependencies
   * @returns all dependencies and sub dependencies
   */
  public static packDependencies({
    packageJsonPath,
    onClose,
    createTarball = true,
    quiet = false
  }: PackDependenciesOption): void {
    const pj = createPackageWithBundledDeps(packageJsonPath);

    if (!quiet || !(Object.keys(pj.dependencies).length > 0)) {
      console.log('===== Packing =====');
      pj.bundledDependencies.forEach(item => console.log(item));
    }
    const walker = new BundleWalkerSync({
      packageJsonCache: new Map([[packageJsonPath, pj]])
    });
    const depFiles: string[] = walker.start().result;
    const files = depFiles.map(file => `node_modules/${file}`);
    const target = getTgzName(pj, 'Dependencies');
    const result = {
      target,
      bundledDependencies: pj.bundledDependencies,
      allDependencies: depFiles
    };

    if (!(Object.keys(pj.dependencies).length > 0)) {
      onClose(quiet, {
        ...result,
        hasCreatedTarball: false,
        hasDependencies: false
      });
    } else if (createTarball) {
      tar
        .create({ gzip: true }, files)
        .pipe(createWriteStream(target))
        .on('close', () => {
          onClose(quiet, {
            ...result,
            hasCreatedTarball: true,
            hasDependencies: true
          });
        });
    } else {
      onClose(quiet, {
        ...result,
        hasCreatedTarball: false,
        hasDependencies: true
      });
    }
  }
}
