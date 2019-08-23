# Aurora CI Scripts

This library is for extended functionality for building web-applications on CI-server.

Features:

- Extracting and packing dependencies included in the project. This is used for
  Nexus IQ analysis.
- Upload tarball to Nexus registry.

## Getting started

```bash
npm install aurora-ci-scripts
```

## Usage

If you have installed the script globally, then you can use it as follow:

```
aurora-ci-scripts <command>
```

## Commands

### pack-dependencies

Must be run from a folder containing a package.json file. This creates an tarball
with all dependencies and its sub dependencies specified in `"dependencies"` in package.json.

Tarball format: `<name>-<version>-dependencies.tgz`

```
aurora-ci-scripts pack-dependencies
```

### upload

**nexusUsername and nexusPassword must be set in `.npmrc` (global or local).**

Uploads tarball. The tarball must exists. It can upload two types of tarball.

- **Webleveransepakke**: This is the tarball you get when running `npm pack`.
- **Dependencies**: This is the tarball you get when running `aurora-ci-scripts pack-dependencies`

```
aurora-ci-scripts upload <version> <classifier>
```

- **version**: `string`
- **classifier**: `Webleveransepakke | Dependencies`
