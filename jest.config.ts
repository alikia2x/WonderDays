/** @type {import('ts-jest').JestConfigWithTsJest} */
import { jsWithTsESM as tsjPreset } from "ts-jest/presets";
module.exports = {
    preset: "ts-jest/presets/js-with-babel-esm",
    testEnvironment: "node",
    transform: {
        ...tsjPreset.transform,
    },
    compilerOptions: {
        verbatimModuleSyntax: false,
    }
};
