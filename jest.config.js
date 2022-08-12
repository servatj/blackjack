module.exports = {
  testEnvironment: "jsdom",
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  testMatch: ['**/__tests__/*.js?(x)'],
};
