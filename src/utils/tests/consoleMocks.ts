export type ConsoleLogMocks = {
  log: jest.SpyInstance;
  warn: jest.SpyInstance;
  error: jest.SpyInstance;
};

export const getConsoleLogMock = (
  method: "log" | "warn" | "error",
  implementation?: VoidFunction
): jest.SpyInstance => {
  return jest
    .spyOn(console, method)
    .mockImplementation(implementation ?? ((): void => {}));
};

export const getConsoleLogMocks = (): ConsoleLogMocks => {
  return {
    log: getConsoleLogMock("log"),
    warn: getConsoleLogMock("warn"),
    error: getConsoleLogMock("error"),
  };
};

export const restoreMockConsoleLogs = (
  mockConsoleLogs: ConsoleLogMocks
): void => {
  for (const mock of Object.values(mockConsoleLogs)) {
    mock.mockRestore();
  }
};
