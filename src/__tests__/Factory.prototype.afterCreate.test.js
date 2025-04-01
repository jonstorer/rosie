const { Factory } = require('../rosie');

describe('Factory.prototype.afterCreate', () => {
  let factory, spyOne, spyTwo;

  beforeEach(() => {
    factory = new Factory();
    spyOne = jest.fn();
    spyTwo = jest.fn();
    factory.afterCreate(spyOne);
    factory.afterCreate(spyTwo);
  });

  it('adds a method to the list of before create methods', () => {
    expect(factory.afterCreateHooks).toEqual([spyOne, spyTwo]);
  });
});
