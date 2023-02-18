export default {
    clearMocks: true,
    transform: {},
    testEnvironment: "jsdom",
    coverageProvider: "v8",
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
    modulePathIgnorePatterns: ["<rootDir>/node_modules/"],
    coveragePathIgnorePatterns: [
      "<rootDir>/node_modules/"
    ],
  };