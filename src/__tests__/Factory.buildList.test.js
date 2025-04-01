const { Factory } = require('../rosie');

describe('Factory.buildList', () => {
  let factory, result;

  beforeEach(() => {
    factory = new Factory();
    jest.spyOn(Factory, 'get').mockReturnValue(factory);
    jest.spyOn(factory, 'build').mockReturnValue('value');
    result = Factory.buildList('factory', 2, 'attrs', 'options');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('gets the correct factory from the registrar', () => {
    expect(Factory.get).toHaveBeenCalledWith('factory');
  });

  it('calls factory.build with the provided args twice', () => {
    expect(factory.build).toHaveBeenCalledTimes(2);
    expect(factory.build).toHaveBeenNthCalledWith(1, 'attrs', 'options');
    expect(factory.build).toHaveBeenNthCalledWith(2, 'attrs', 'options');
  });

  it('returns the result of factory.buildList', () => {
    expect(result).toEqual(['value', 'value']);
  });
});
