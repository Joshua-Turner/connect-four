const allowedMethods = ["log", "warn", "error"];
const getConsoleMock = (method, implementation) => {
  if (allowedMethods.includes(method)) {
    return jest
      .spyOn(console, method)
      .mockImplementation(implementation ?? (() => {}));
  }
};

const getConsoleLogMocks = () => {
  return {
    log: getConsoleMock("log"),
    warn: getConsoleMock("warn"),
    error: getConsoleMock("error"),
  };
};

const restoreMockConsoleLogs = (mockConsoleLogs) => {
  for (const mock of Object.values(mockConsoleLogs)) {
    mock.mockRestore();
  }
};

module.exports = {
  getConsoleLogMocks,
  getConsoleMock,
  restoreMockConsoleLogs,
};
