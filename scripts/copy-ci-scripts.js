// Script for adding aurora-ci-scripts to node_modules, used as part of Jenkins pipeline
const {execSync} = require("child_process")

execSync("chmod +x ./lib/bin/index.js")
execSync("cp -r lib node_modules/aurora-ci-scripts")
execSync("ln -s ../aurora-ci-scripts/bin/index.js node_modules/.bin/aurora-ci-scripts")