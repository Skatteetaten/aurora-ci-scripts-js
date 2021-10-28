import { NexusUploader } from '../services/NexusUploader';
import { ErrorHandler } from '../services/ErrorHandler';
import {
  isClassifier,
  Classifier,
  VALID_CLASSIFIERS,
} from '../utils/classifier';

export function validateAndGetArgs(
  ...args: string[]
): [string, string, Classifier] {
  if (args.length < 5) {
    throw new Error('Missing arguments. Usage: upload <version> <classifier>');
  }

  // 0 = node, 1 = scripts/<script>.js
  const [, , appPath, version, classifier] = args;

  if (!isClassifier(classifier)) {
    const classifiers = VALID_CLASSIFIERS.join(', ');
    throw new Error(
      `${classifier} classifier is case sensitive and must be one of: ${classifiers}`
    );
  }

  if (!version) {
    throw new Error('Version is missing');
  }

  return [appPath, version, classifier];
}

try {
  const [appPath, version, classifier] = validateAndGetArgs(...process.argv);
  new NexusUploader()
    .upload(appPath, version, classifier)
    .catch(ErrorHandler.logAndExit);
} catch (error: unknown) {
  if (error instanceof Error) {
    ErrorHandler.logAndExit(error);
  } else {
    console.warn(error);
  }
}
