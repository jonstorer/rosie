const { Factory } = require('../rosie');
const { randomInt } = require('./helpers');

describe('Factory.prototype.options', () => {
  let factory, length;
  beforeEach(() => {
    length = randomInt();
    factory = new Factory()
      .option('count', 4)
      .option('size', 'big')
      .option('length', () => length);
  });

  it('returns the default options', () => {
    expect(factory.options()).toEqual({
      count: 4,
      size: 'big',
      length,
    });
  });

  it('can be overridden', () => {
    expect(factory.options({ count: 5, size: 'small', length: 5 })).toEqual({
      count: 5,
      size: 'small',
      length: 5,
    });
  });
});
