const { Factory } = require('../rosie');

describe('Factory.create', () => {
  let factory, result;

  beforeEach(() => {
    factory = new Factory();
    jest.spyOn(Factory, 'get').mockReturnValue(factory);
    jest.spyOn(factory, 'create').mockReturnValue('value');
    result = Factory.create('factory', 'attrs', 'options');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('gets the correct factory from the registrar', () => {
    expect(Factory.get).toHaveBeenCalledWith('factory');
  });

  it('calls factory.create with the provided args', () => {
    expect(factory.create).toHaveBeenCalledWith('attrs', 'options');
  });

  it('returns the result of factory.create', () => {
    expect(result).toBe('value');
  });
});
