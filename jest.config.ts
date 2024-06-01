import { jsWithTsESM as tsjPreset } from "ts-jest/presets";
module.exports = {
    preset: "ts-jest/presets/js-with-babel-esm",
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
    }
};
