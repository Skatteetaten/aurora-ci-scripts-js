import { PackageJson } from './packageJson';
import { Classifier } from './classifier';

export function getTgzName(pj: PackageJson, classifier: Classifier): string {
  if (classifier === 'Webleveransepakke') {
    return `${pj.name}-${pj.version}.tgz`;
  } else {
    return `${pj.name}-${pj.version}-dependencies.tgz`;
  }
}

export function getSize(size: number): string {
  const exp = size > Math.pow(1000, 2) ? 2 : 1;
  const powSize = size / Math.pow(1000, exp);
  const calcSize = Math.round(powSize * 100) / 100;
  return `${calcSize}${exp > 1 ? 'M' : 'K'}`;
}
