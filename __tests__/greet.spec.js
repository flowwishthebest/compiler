const { greet } = require('../src/helpers/greet.helper');

test('Call with empty param', () => {
    expect(greet()).toBe('Hello, World!');
});
