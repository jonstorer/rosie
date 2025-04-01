const { Factory } = require('../rosie');

describe('Factory.createList', () => {
  let factory, result;
  beforeEach(() => {
    factory = new Factory();
    jest.spyOn(Factory, 'get').mockReturnValue(factory);
    jest.spyOn(factory, 'createList').mockReturnValue('value');
    result = Factory.createList('factory', 3, 'attrs', 'options');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('gets the correct factory from the registrar', () => {
    expect(Factory.get).toHaveBeenCalledWith('factory');
  });

  it('calls factory.createList with the provided args', () => {
    expect(factory.createList).toHaveBeenCalledWith(3, 'attrs', 'options');
  });

  it('returns the result of factory.createList', () => {
    expect(result).toEqual('value');
  });
});
