const { Factory } = require('../rosie');
const { randomString, randomInt } = require('./helpers');

describe('Factory.prototype.createList', () => {
  let factory, key, value, attrs, options, stub;

  beforeEach(() => {
    key = randomString();
    value = randomInt();
    factory = new Factory().attr(key, value);

    stub = jest.spyOn(factory, 'create');

    attrs = { [randomString()]: randomInt() };
    options = { [randomString()]: randomInt() };
  });

  describe('sync create', () => {
    beforeEach(() => {
      stub
        .mockImplementationOnce(() => ({}))
        .mockImplementationOnce(() => ({}));
    });

    it('returns an array with n items', () => {
      expect(factory.createList(2)).toHaveLength(2);
    });

    it('calls create n times with the provided args', () => {
      factory.createList(2);
      expect(stub).toHaveBeenCalledTimes(2);
    });

    it('calls create with the provided args', () => {
      factory.createList(2, attrs, options);
      expect(stub).toHaveBeenCalledWith(attrs, options);
    });
  });

  describe('async create', () => {
    beforeEach(() => {
      stub
        .mockImplementationOnce(() => ({}))
        .mockImplementationOnce(() => Promise.resolve({}));
    });

    it('returns an array with n items', async () => {
      await expect(factory.createList(2)).resolves.toHaveLength(2);
    });

    it('calls create n times with the provided args', async () => {
      await factory.createList(2);
      expect(stub).toHaveBeenCalledTimes(2);
    });

    it('calls create with the provided args', async () => {
      await factory.createList(2, attrs, options);
      expect(stub).toHaveBeenCalledWith(attrs, options);
    });
  });
});
