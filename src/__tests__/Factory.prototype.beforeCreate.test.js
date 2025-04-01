const { Factory } = require('../rosie');

describe('Factory.prototype.beforeCreate', () => {
  let factory, spyOne, spyTwo;

  beforeEach(() => {
    factory = new Factory();
    spyOne = jest.fn();
    spyTwo = jest.fn();
    factory.beforeCreate(spyOne);
    factory.beforeCreate(spyTwo);
  });

  it('adds a method to the list of before create methods', () => {
    expect(factory.beforeCreateHooks).toEqual([spyOne, spyTwo]);
  });
});
