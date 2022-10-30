import type { Config } from "jest";

const config: Config = {
    verbose: true,
    modulePathIgnorePatterns: ["<rootDir>/tests/integration/"],
    preset: "ts-jest",
};

export default config;
