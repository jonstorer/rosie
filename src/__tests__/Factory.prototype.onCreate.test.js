const { Factory } = require('../rosie');

describe('Factory.prototype.onCreate', () => {
  let factory, spy;
  beforeEach(() => {
    factory = new Factory();
    spy = jest.fn();
    factory.onCreate(spy);
  });

  it('sets the onCreateHandler', () => {
    expect(factory.createHandler).toEqual(spy);
  });
});
