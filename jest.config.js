const dotenv = require("dotenv");
dotenv.config({
    path: ".env.development"
})

const nextJest = require("next/jest");
const projectDir = process.cwd()
const createJestConfig = nextJest({
    dir: projectDir,
});
const jestConfig = createJestConfig({
    moduleDirectories : ["node_modules", "<rootDir>"],
    setupFiles: ["dotenv/config"]
});

module.exports = jestConfig;