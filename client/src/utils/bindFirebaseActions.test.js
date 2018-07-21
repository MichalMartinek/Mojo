import {bindFirebaseActions} from "./bindFirebaseActions";


describe("bindFirebaseActions", () => {
  test('bind single function', () => {
    const mockFirebase = jest.fn()
    const firebaseAction = (firebase) => {
      return (x) => (firebase(x))
    }
    const boundAction = bindFirebaseActions(mockFirebase, firebaseAction)
    const param = 5
    boundAction(param)
    expect(mockFirebase.mock.calls.length).toBe(1);
    expect(mockFirebase.mock.calls[0][0]).toBe(param);
  });
  test('bind object of functions', () => {
    const mockFirebase = jest.fn()
    const firebaseAction = (firebase) => {
      return (x) => (firebase(x))
    }
    const boundActions = bindFirebaseActions(mockFirebase, {bar: firebaseAction, foo: firebaseAction})
    const param = 125
    boundActions.foo(param)
    boundActions.bar(param)
    expect(mockFirebase.mock.calls.length).toBe(2);
    expect(mockFirebase.mock.calls[0][0]).toBe(param);
    expect(mockFirebase.mock.calls[1][0]).toBe(param);
  });
})