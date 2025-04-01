const { Factory } = require('../rosie');
const { randomString } = require('./helpers');

describe('Factory.prototype.attrs', () => {
  let factory;
  let keyOne, keyTwo, keyThree;

  beforeEach(() => {
    keyOne = randomString();
    keyTwo = randomString();
    keyThree = randomString();

    factory = new Factory();
    jest.spyOn(factory, 'attr');

    const attributes = Object.create({ keyThree });
    attributes.keyOne = keyOne;
    attributes.keyTwo = keyTwo;

    factory.attrs(attributes);
  });

  it('calls attr for each own key value pair', () => {
    expect(factory.attr).toHaveBeenCalledTimes(2);
    expect(factory.attr).toHaveBeenCalledWith('keyOne', keyOne);
    expect(factory.attr).toHaveBeenCalledWith('keyTwo', keyTwo);
    expect(factory.attr).not.toHaveBeenCalledWith('keyThree', keyThree);
  });
});
