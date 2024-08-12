export default {
  testEnvironment: "jsdom",
  transform: {},
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  modulePathIgnorePatterns: ["<rootDir>/node_modules/"],
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
