import { isClassifier } from './classifier';

describe('classifier', () => {
  describe('isClassifier', () => {
    type Test = [string, boolean];
    test.each<Test>([
      ['Webleveransepakke', true],
      ['Dependencies', true],
      ['Stuff', false]
    ])('given %s it should return %s', (text, expected) => {
      expect(isClassifier(text)).toBe(expected);
    });
  });
});
