import { PathLike, readFileSync } from 'fs';

export interface PackageJson {
  name: string;
  groupId?: string;
  version: string;
  devDependencies: {
    [key: string]: string;
  };
  dependencies: {
    [key: string]: string;
  };
  bundledDependencies: string[];
}

export function getPackageJson(path: PathLike): PackageJson {
  const content = readFileSync(path).toString();
  const original = JSON.parse(content);
  return {
    bundledDependencies: [],
    dependencies: {},
    devDependencies: {},
    ...original
  };
}

export function createPackageWithBundledDeps(path: string): PackageJson {
  const pj = getPackageJson(path);

  const bundledDependencies = Array.from(
    new Set([
      ...Object.keys(pj.dependencies),
      ...(pj.bundledDependencies || [])
    ])
  );

  return {
    ...pj,
    bundledDependencies
  };
}
