const { Factory } = require('../rosie');

describe('Factory.build', () => {
  let factory;
  let result;

  beforeEach(() => {
    factory = new Factory();

    // Stub Factory.get to always return our factory instance.
    jest.spyOn(Factory, 'get').mockReturnValue(factory);

    // Stub factory.build to return 'fake result'.
    jest.spyOn(factory, 'build').mockReturnValue('fake result');

    // Call the method under test.
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
