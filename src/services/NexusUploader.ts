import { execSync } from 'child_process';
import { resolve } from 'path';

import {
  NexusAuthentication,
  deployToNexus,
  NexusDeployerConfig,
  MavenSchema,
  FileType,
} from 'aurora-artifact-deployer';

import { getTgzName, toSafeName } from '../utils/utils';
import { Classifier } from '../utils/classifier';
import {
  PackageJson,
  createPackageWithBundledDeps,
} from '../utils/packageJson';

export class NexusUploader {
  public async upload(
    appPath: string,
    version: string,
    classifier: Classifier
  ): Promise<void> {
    const pkgJson = this.getPackageJson(appPath);
    const hasBundledDependencies = pkgJson.bundledDependencies.length > 0;

    if (!hasBundledDependencies && classifier === 'Dependencies') {
      console.log('===== Info =====');
      console.log('No dependencies to analyze');
      console.log('Uploading skipped');
    } else {
      await this.uploadToNexus(pkgJson, version, classifier);
    }
  }

  private getPackageJson(path: string): Required<PackageJson> {
    const pjPath = resolve(path, 'package.json');
    const pkgJson = createPackageWithBundledDeps(pjPath);
    if (!pkgJson) {
      throw new Error('Error reading package.json');
    }

    const { groupId } = pkgJson;
    if (!groupId) {
      throw new Error(
        'groupId is empty or null. Is groupId set in package.json?'
      );
    }

    return {
      ...pkgJson,
      groupId,
    };
  }

  private async uploadToNexus(
    pkgJson: Required<PackageJson>,
    version: string,
    classifier: Classifier
  ): Promise<void> {
    const auth = this.getAuthentication();
    const tgzPath = getTgzName(pkgJson, classifier);

    let releaseType = 'maven-releases';
    if (version.includes('SNAPSHOT')) {
      releaseType = 'maven-snapshots';
    }

    const repoHost = this.getConfig('nexus3Host');
    if (repoHost === 'undefined') {
      throw new Error(
        'Nexus repository host is not valid. nexus3Host must be set in .npmrc.'
      );
    }

    const nexusConfig: NexusDeployerConfig = {
      auth,
      classifier,
      url: `${repoHost}/repository/${releaseType}`,
      artifact: tgzPath,
    };

    const excludeFileTypes: FileType[] = [];
    if (classifier === 'Dependencies') {
      excludeFileTypes.push('latest', 'pom', 'project');
    }

    const schema: MavenSchema = {
      groupId: pkgJson.groupId,
      artifactId: toSafeName(pkgJson.name),
      packaging: 'tgz',
      version: version,
    };

    await deployToNexus(schema, nexusConfig, {
      parallel: true,
      excludeFileTypes,
    });
  }

  private getAuthentication(): NexusAuthentication {
    const auth = {
      username: this.getConfig('nexus3Username'),
      password: this.getConfig('nexus3Password'),
    };

    if (auth.password === 'undefined' || auth.username === 'undefined') {
      throw new Error(
        'Nexus authentication is not valid. nexus3Username and nexus3Password must be set in .npmrc.'
      );
    }

    return auth;
  }

  private getConfig(prop: string): string {
    const buff = execSync(`npm config get ${prop}`);
    return buff.toString().trim();
  }
}
