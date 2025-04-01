const { Factory } = require('../rosie');

describe('Factory.get', () => {
  let mock;

  beforeEach(() => {
    mock = {};
    Factory.factories['factory'] = mock;
  });

  it('returns the registered factory', () => {
    expect(Factory.get('factory')).toEqual(mock);
  });

  it('throws an error when the requested factory is not registered', () => {
    expect(() => Factory.get('other')).toThrow(
      'The "other" factory is not defined.'
    );
  });
});
