const { Factory } = require('../rosie');

describe('Factory.prototype.after', () => {
  let spy, factory;

  beforeEach(() => {
    spy = jest.fn();
    factory = new Factory();
    jest.spyOn(factory, 'afterBuild');
    factory.after(spy);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('adds a method to the list of after build methods', () => {
    expect(factory.afterBuild).toHaveBeenCalledWith(spy);
  });
});
