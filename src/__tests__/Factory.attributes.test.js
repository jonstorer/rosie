const { Factory } = require('../rosie');

describe('Factory.attributes', () => {
  let factory;
  let result;

  beforeEach(() => {
    // Create a new instance for each test.
    factory = new Factory();

    // Stub Factory.get to always return our factory instance.
    jest.spyOn(Factory, 'get').mockReturnValue(factory);

    // Stub factory.attributes to return 'value'.
    jest.spyOn(factory, 'attributes').mockReturnValue('value');

    // Call the method under test.
    result = Factory.attributes('factory', 'attrs', 'options');
  });

  afterEach(() => {
    // Restore all mocks so they don't affect other tests.
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
