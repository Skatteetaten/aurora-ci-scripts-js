import { getPackageJson, createPackageWithBundledDeps } from './packageJson';
import { resolve } from 'path';

describe('packageJson', () => {
  const pkgPath = resolve(__dirname, '../../package.json');
  describe('getPackageJson', () => {
    it('should create an object of package.json', () => {
      const pkg = getPackageJson(pkgPath);
      expect(pkg.name).toBe('@skatteetaten/ci-scripts');
    });
  });

  describe('createPackageWithBundledDeps', () => {
    it('should make an package.json with all dependencies as bundledDependencies', () => {
      const pkgOriginal = getPackageJson(pkgPath);
      const pkg = createPackageWithBundledDeps(pkgPath);

      expect(Object.keys(pkgOriginal.dependencies).length).toBe(3);
      expect(pkgOriginal.bundledDependencies.length).toBe(0);

      expect(pkg.bundledDependencies.length).toBe(3);
    });
  });
});
