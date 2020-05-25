import { getSize, getTgzName } from './utils';
import { PackageJson } from './packageJson';
import { Classifier } from './classifier';

describe('utils', () => {
  describe('getTgzName', () => {
    const pkg: PackageJson = {
      name: 'artifact',
      version: '1.0.0',
      bundledDependencies: [],
      devDependencies: {},
      dependencies: {},
    };

    type Test = [Classifier, string];

    test.each<Test>([
      ['Webleveransepakke', 'artifact-1.0.0.tgz'],
      ['Dependencies', 'artifact-1.0.0-dependencies.tgz'],
    ])(
      '%# given classifier %s it should return tgz name as %s',
      (classifier, expected) => {
        expect(getTgzName(pkg, classifier)).toBe(expected);
      }
    );
  });

  describe('getTgzName for scoped package', () => {
    const pkg: PackageJson = {
      name: '@skatteetaten/artifact',
      version: '1.0.0',
      bundledDependencies: [],
      devDependencies: {},
      dependencies: {},
    };

    type Test = [Classifier, string];

    test.each<Test>([
      ['Webleveransepakke', 'skatteetaten-artifact-1.0.0.tgz'],
      ['Dependencies', 'skatteetaten-artifact-1.0.0-dependencies.tgz'],
    ])(
      '%# given classifier %s it should return tgz name as %s',
      (classifier, expected) => {
        expect(getTgzName(pkg, classifier)).toBe(expected);
      }
    );
  });

  describe('getSize', () => {
    test.each`
      size       | expected
      ${1000}    | ${'1K'}
      ${15000}   | ${'15K'}
      ${150000}  | ${'150K'}
      ${2000000} | ${'2M'}
    `('return $expected when size is $size', ({ size, expected }) => {
      expect(getSize(size)).toBe(expected);
    });
  });
});
