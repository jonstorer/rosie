const { Factory } = require('../rosie');
const { randomString, randomInt } = require('./helpers');

describe('Factory.prototype.attributes', () => {
  let factory, field, value;

  beforeEach(() => {
    field = randomString();
    value = randomInt();

    factory = new Factory()
      .attr(field, value)
      .option('less', 4)
      .attr(`double_${field}`, () => 3 * 2)
      .attr(
        `squared_${field}`,
        [`double_${field}`],
        (doubled) => doubled * doubled
      )
      .attr(`less_${field}`, ['less'], (less) => value - less);
  });

  it('returns the values for each attribute', () => {
    expect(factory.attributes()).toEqual({
      [field]: value,
      [`double_${field}`]: 6,
      [`squared_${field}`]: 36,
      [`less_${field}`]: value - 4,
    });
  });

  it('can provide values for attrs', () => {
    expect(factory.attributes({ [field]: 10 })).toEqual({
      [field]: 10,
      [`double_${field}`]: 6,
      [`squared_${field}`]: 36,
      [`less_${field}`]: value - 4,
    });
  });

  it('can provide values for calculated fields', () => {
    expect(factory.attributes({ [`double_${field}`]: 10 })).toEqual({
      [field]: value,
      [`double_${field}`]: 10,
      [`squared_${field}`]: 100,
      [`less_${field}`]: value - 4,
    });
  });

  it('can provide options for field dependencies', () => {
    expect(factory.attributes({}, { less: 3 })).toEqual({
      [field]: value,
      [`double_${field}`]: 6,
      [`squared_${field}`]: 36,
      [`less_${field}`]: value - 3,
    });
  });
});
