const { Factory } = require('../rosie');

describe('Factory.prototype.afterBuild', () => {
  let factory, spyOne, spyTwo;

  beforeEach(() => {
    factory = new Factory();
    spyOne = jest.fn();
    spyTwo = jest.fn();
    factory.afterBuild(spyOne);
    factory.afterBuild(spyTwo);
  });

  it('adds a method to the list of before create methods', () => {
    expect(factory.afterBuildHooks).toEqual([spyOne, spyTwo]);
  });
});
