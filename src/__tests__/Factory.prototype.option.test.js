const { Factory } = require('../rosie');
const { randomString, randomInt } = require('./helpers');

describe('Factory.prototype.option', () => {
  let factory;
  beforeEach(() => {
    factory = new Factory();
  });

  describe('static option', () => {
    let field, value;
    beforeEach(() => {
      field = randomString();
      value = randomString();
      factory.option(field, value);
    });

    it('has an entry for the field', () => {
      expect(factory.opts).toHaveProperty(field);
    });

    it('has a builder for the field', () => {
      expect(typeof factory.opts[field].builder).toBe('function');
    });

    it('returns the value', () => {
      expect(factory.opts[field].builder()).toEqual(value);
    });

    it('has no dependencies', () => {
      expect(factory.opts[field].dependencies).toEqual([]);
    });
  });

  describe('dynamic option', () => {
    let field, value;
    beforeEach(() => {
      field = randomString();
      value = randomInt();
      factory.option(field, () => value + 1);
    });

    it('returns the value', () => {
      expect(factory.opts[field].builder()).toEqual(value + 1);
    });

    it('has no dependencies', () => {
      expect(factory.opts[field].dependencies).toEqual([]);
    });
  });

  describe('with dependencies', () => {
    let fieldOne, valueOne, fieldTwo, valueTwo;
    beforeEach(() => {
      fieldOne = randomString();
      valueOne = randomInt();
      fieldTwo = randomString();
      valueTwo = randomInt();
      factory
        .option(fieldOne, valueOne)
        .option(fieldTwo, [fieldOne], (valueOne) => valueTwo + valueOne);
    });

    it('knows the required dependencies', () => {
      expect(factory.opts[fieldTwo].dependencies).toContain(fieldOne);
    });
  });
});
