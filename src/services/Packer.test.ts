import { Packer, PackDependenciesResult } from './Packer';
import { resolve } from 'path';
describe('Packer', () => {
  describe('packDependencies', () => {
    it('should collect all dependencies', () => {
      const packageJsonPath = resolve(__dirname, '../../package.json');

      const verify = (_: boolean, result: PackDependenciesResult): void => {
        expect(result).toBeDefined();
        expect(result.allDependencies.length).toBeGreaterThan(0);
        expect(result.hasCreatedTarball).toBeFalsy();
      };

      Packer.packDependencies({
        packageJsonPath,
        createTarball: false,
        quiet: true,
        onClose: verify,
      });
    });
  });
});
