import { greet } from '../src/helpers/greet.helper';

test('Call with empty param', () => {
    expect(greet()).toBe('Hello, World!');
});
