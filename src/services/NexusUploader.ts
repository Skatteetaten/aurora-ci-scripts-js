import { execSync } from 'child_process';
import { resolve } from 'path';

import {
  NexusAuthentication,
  deployToNexus,
  NexusDeployerConfig,
  MavenSchema,
  FileType
} from 'aurora-artifact-deployer';

import { getTgzName, toSafeName } from '../utils/utils';
import { Classifier } from '../utils/classifier';
import { getPackageJson, PackageJson } from '../utils/packageJson';

export class NexusUploader {
  public async upload(
    appPath: string,
    version: string,
    classifier: Classifier
  ): Promise<void> {
    const pkgJson = this.getPackageJson(appPath);
    await this.uploadToNexus(pkgJson, version, classifier);
  }

  private getPackageJson(path: string): Required<PackageJson> {
    const pjPath = resolve(path, 'package.json');
    const pkgJson = getPackageJson(pjPath);
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
      groupId
    };
  }

  private async uploadToNexus(
    pkgJson: Required<PackageJson>,
    version: string,
    classifier: Classifier
  ): Promise<void> {
    const auth = this.getAuthentication();
    const tgzPath = getTgzName(pkgJson, classifier);

    let releaseType = 'releases';
    if (version.includes('SNAPSHOT')) {
      releaseType = 'snapshots';
    }

    const nexusConfig: NexusDeployerConfig = {
      auth,
      classifier,
      url: `http://aurora/nexus/content/repositories/${releaseType}`,
      artifact: tgzPath
    };

    const excludeFileTypes: FileType[] = [];
    if (classifier === 'Dependencies') {
      excludeFileTypes.push('latest', 'pom', 'project');
    }

    const schema: MavenSchema = {
      groupId: pkgJson.groupId,
      artifactId: toSafeName(pkgJson.name),
      packaging: 'tgz',
      version: version
    };

    await deployToNexus(schema, nexusConfig, {
      parallel: true,
      excludeFileTypes
    });
  }

  private getAuthentication(): NexusAuthentication {
    const auth = {
      username: this.getConfig('nexusUsername'),
      password: this.getConfig('nexusPassword')
    };

    if (auth.password === 'undefined' || auth.username === 'undefined') {
      throw new Error(
        'Nexus authentication is not valid. nexusUsername and nexusPassword must be set in .npmrc.'
      );
    }

    return auth;
  }

  private getConfig(prop: string): string {
    const buff = execSync(`npm config get ${prop}`);
    return buff.toString().trim();
  }
}
