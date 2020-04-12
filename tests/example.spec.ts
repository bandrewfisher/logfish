import axios from 'axios';
import Logfish, { LogConfigLevel } from '../src/index'; // eslint-disable-line no-unused-vars

const mockPost = jest.fn();

interface MockAxiosDefaults {
  headers: {
    'logfish-key'?: string
  }
}
const mockAxiosDefaults: MockAxiosDefaults = {
  headers: {},
};
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    post: mockPost,
    defaults: mockAxiosDefaults,
  })),
}));

const POST_ENDPOINT = '/log';
const MESSAGE = 'message';
const MOCK_KEY = 'key';
const MOCK_URL = 'url';

const logMatch = (level: LogConfigLevel, message: any = MESSAGE) => {
  const lastPostCall = mockPost.mock.calls[mockPost.mock.calls.length - 1];
  return lastPostCall[0] === POST_ENDPOINT && lastPostCall[1] === `${level}: ${message}`;
};

const createLogfish = (): Logfish => new Logfish(MOCK_KEY, MOCK_URL);

test('creates axios object', () => {
  createLogfish();
  expect(axios.create).toHaveBeenCalledWith({ baseURL: MOCK_URL });
  expect(mockAxiosDefaults.headers['logfish-key']).toBe(MOCK_KEY);
});

test('posts data to url', () => {
  const logfish = createLogfish();
  logfish.log(MESSAGE);
  expect(mockPost).toHaveBeenCalled();
});

test('INFO is default level', () => {
  const logfish = createLogfish();
  logfish.log(MESSAGE);
  expect(logMatch('INFO')).toBe(true);
});

test('custom levels are used', () => {
  const logfish = createLogfish();
  const levels: LogConfigLevel[] = ['DEBUG', 'INFO', 'WARN', 'ERROR'];

  levels.forEach((level) => {
    logfish.log(MESSAGE, { level });
    expect(logMatch(level)).toBe(true);
  });
});

test('info method logs with INFO', () => {
  const logfish = createLogfish();
  logfish.info(MESSAGE);
  expect(logMatch('INFO')).toBe(true);
});

test('warn method logs with WARN', () => {
  const logfish = createLogfish();
  logfish.warn(MESSAGE);
  expect(logMatch('WARN')).toBe(true);
});

test('debug method logs with DEBUG', () => {
  const logfish = createLogfish();
  logfish.debug(MESSAGE);
  expect(logMatch('DEBUG')).toBe(true);
});

test('error method logs with ERROR', () => {
  const logfish = createLogfish();
  logfish.error(MESSAGE);
  expect(logMatch('ERROR')).toBe(true);
});
