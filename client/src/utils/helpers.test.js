import {functionHandler} from "./helpers";

describe("FunctionHandler", () => {
  test('always returns function', () => {
    expect(typeof functionHandler(undefined)).toBe('function');
  });
  test('returns passed function', () => {
    const mockFunction = jest.fn();
    functionHandler(mockFunction)()
    expect(mockFunction.mock.calls.length).toBe(1);
  });
})