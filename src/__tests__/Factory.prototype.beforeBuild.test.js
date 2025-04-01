const { Factory } = require('../rosie');

describe('Factory.prototype.beforeBuild', () => {
  let factory, spyOne, spyTwo;

  beforeEach(() => {
    factory = new Factory();
    spyOne = jest.fn();
    spyTwo = jest.fn();
    factory.beforeBuild(spyOne);
    factory.beforeBuild(spyTwo);
  });

  it('adds a method to the list of before create methods', () => {
    expect(factory.beforeBuildHooks).toEqual([spyOne, spyTwo]);
  });
});
