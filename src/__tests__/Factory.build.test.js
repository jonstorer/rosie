const { Factory } = require('../rosie');

describe('Factory.build', () => {
  let factory;
  let result;

  beforeEach(() => {
    factory = new Factory();
    jest.spyOn(Factory, 'get').mockReturnValue(factory);
    jest.spyOn(factory, 'build').mockReturnValue('fake result');
    result = Factory.build('factory', 'attrs', 'options');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('gets the correct factory from the registrar', () => {
    expect(Factory.get).toHaveBeenCalledWith('factory');
  });

  it('calls factory.build with the provided args', () => {
    Factory.build('factory', 'attrs', 'options');
    expect(factory.build).toHaveBeenCalledWith('attrs', 'options');
  });

  it('returns the built factory', () => {
    expect(result).toBe('fake result');
  });
});
