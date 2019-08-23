export const VALID_CLASSIFIERS = ['Webleveransepakke', 'Dependencies'] as const;

export type Classifier = typeof VALID_CLASSIFIERS[number];

export function isClassifier(text: string): text is Classifier {
  return Array.from<string>(VALID_CLASSIFIERS).includes(text);
}
