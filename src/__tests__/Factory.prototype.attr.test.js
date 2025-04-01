const { Factory } = require('../rosie');
const { randomString, randomInt } = require('./helpers');

describe('Factory.prototype.attr', () => {
  let factory;

  beforeEach(() => {
    factory = new Factory();
  });

  describe('static attribute', () => {
    let field, value;
    beforeEach(() => {
      field = randomString();
      value = randomString();
      factory.attr(field, value);
    });

    it('has an entry for the field', () => {
      expect(factory._attrs).toHaveProperty(field);
    });

    it('has a builder for the field', () => {
      expect(typeof factory._attrs[field].builder).toBe('function');
    });

    it('returns the value', () => {
      expect(factory._attrs[field].builder()).toEqual(value);
    });

    it('has no dependencies', () => {
      expect(factory._attrs[field].dependencies).toEqual([]);
    });
  });

  describe('dynamic attribute', () => {
    let field, value;

    beforeEach(() => {
      field = randomString();
      value = randomInt();
      factory.attr(field, () => value + 1);
    });

    it('returns the value', () => {
      expect(factory._attrs[field].builder()).toEqual(value + 1);
    });

    it('has no dependencies', () => {
      expect(factory._attrs[field].dependencies).toEqual([]);
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
        .attr(fieldOne, valueOne)
        .attr(fieldTwo, [fieldOne], (v1) => valueTwo + v1);
    });

    it('knows the required dependencies', () => {
      expect(factory._attrs[fieldTwo].dependencies).toContain(fieldOne);
    });
  });
});
