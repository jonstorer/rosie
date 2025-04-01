const { Factory } = require('../rosie');

describe('Factory.attributes', () => {
  let factory;
  let result;

  beforeEach(() => {
    factory = new Factory();
    jest.spyOn(Factory, 'get').mockReturnValue(factory);
    jest.spyOn(factory, 'attributes').mockReturnValue('value');
    result = Factory.attributes('factory', 'attrs', 'options');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('gets the correct factory from the registrar', () => {
    expect(Factory.get).toHaveBeenCalledWith('factory');
  });

  it('calls factory.attributes with the provided args', () => {
    expect(factory.attributes).toHaveBeenCalledWith('attrs', 'options');
  });

  it('returns the result of factory.attributes', () => {
    expect(result).toBe('value');
  });
});
