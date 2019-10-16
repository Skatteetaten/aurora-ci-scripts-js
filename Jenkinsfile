#!/usr/bin/env groovy
def jenkinsfile

def overrides = [
    scriptVersion  : 'v7',
    pipelineScript: 'https://git.aurora.skead.no/scm/ao/aurora-pipeline-scripts.git',
    iq: false,
    publishToNpm: true,
    publishSnapshotToNpm: true,
    npmInstallCommand: 'ci',
    credentialsId: "github",
    chatRoom: "#aos-notifications",
    nodeVersion: "10",
    openShiftBuild: false,
    deployTo: null,
    versionStrategy: [
        [ branch: 'master', versionHint: '2']
    ]
]

fileLoader.withGit(overrides.pipelineScript, overrides.scriptVersion) {
  jenkinsfile = fileLoader.load('templates/webleveransepakke')
}

jenkinsfile.run(overrides.scriptVersion, overrides)
